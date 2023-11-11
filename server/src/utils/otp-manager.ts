import { readFile, writeFile } from 'node:fs/promises';
import { serverFilePath } from './constant.js';
import { OtpStatus } from '../common/common.js';
import OtpModel from '../schema/otp.schema.js';
export class OtpManager {
    private _mobileNumber: string;
    private _otp: string;
    private _verificationToken: string;
    private _expiryTimeStamp: number;

    /* static variables */
    static readonly maxOtpLength = 4;
    static readonly expiryInTime = 1 * 60 * 1000; //2 mins
    static readonly intervalTime = OtpManager.expiryInTime + 5; // 5 sec buffer added to expiry time.
    static intervalInstance: any = null;
    static otpObjCount: number = 0;

    constructor(mobileNumber: string) {
        this._mobileNumber = mobileNumber;
        this._otp = OtpManager.generateOtp();
        this._expiryTimeStamp = Date.now() + OtpManager.expiryInTime;
        this._verificationToken = OtpManager.createToken(this._mobileNumber, this._otp);
        OtpManager.registerOtp(this);
        OtpManager.monitor();
    }

    /* Getters */
    get mobileNumber() {
        return this._mobileNumber;
    }
    get otp() {
        return this._otp;
    }
    get isExpired() {
        return (Date.now() > this._expiryTimeStamp ? true : false);
    }
    get verificationToken() {
        return this._verificationToken;
    }

    static async registerOtp(otpObj: OtpManager) {
        try {
            const findInstance = await OtpModel.findOne({ mobileNumber: otpObj._mobileNumber });

            if (!findInstance) {
                /* create new instance */
                await OtpModel.create({
                    mobileNumber: otpObj._mobileNumber,
                    token: otpObj._verificationToken,
                    expiryTime: otpObj._expiryTimeStamp,
                    otp: otpObj._otp
                });
                OtpManager.otpObjCount++;
            } else {
                /* update the existing instance */
                await OtpModel.findByIdAndUpdate(findInstance._id, {
                    token: otpObj._verificationToken,
                    expiryTime: otpObj._expiryTimeStamp,
                    otp: otpObj._otp
                })
            }
        } catch (error) {
            throw (error);
        }
    }

    static async verifyOtp(token: string, otp: string): Promise<OtpStatus | string> {
        try {
            const findInstance = await OtpModel.findOne({ token });

            if (!findInstance) {
                return OtpStatus.OTP_EXPIRED;
            } else {
                if (findInstance.otp === otp) {
                    return findInstance.mobileNumber;
                } else {
                    return OtpStatus.OTP_INCORRECT;
                }
            }
        } catch (error) {
            return OtpStatus.OTP_ERROR;
        }
    }

    private static generateOtp(): string {
        const numbers = '0123456789';
        let count = 0, generatedOtp = '';

        while (count < OtpManager.maxOtpLength) {
            const index = Math.floor(Math.random() * 10);
            generatedOtp += numbers[index];
            count++;
        }
        return generatedOtp;
    }

    private static createToken(key1: string, key2: string): string {
        const token = Buffer.from(`${key2}${key1}`).toString('base64');
        return token;
    }

    private static async deleteExpiredOtp() {
        try {
            const otpList = await OtpModel.find({});

            const expiredItems = otpList.filter(item => {
                if (Date.now() > item.expiryTime) {
                    return item._id;
                }
            });

            for (let id of expiredItems) {
                await OtpModel.findByIdAndDelete(id);
            }
            await OtpManager.updateOtpObjCount();
        } catch (error) {
            console.log(error);
        }
    }

    private static async updateOtpObjCount() {
        try {
            const list = await OtpModel.find({});
            OtpManager.otpObjCount = list.length;
        } catch (error) {
            console.log(error);
        }
    }

    private static monitor() {
        if (!OtpManager.intervalInstance) {
            OtpManager.intervalInstance = setInterval(async () => {
                await OtpManager.deleteExpiredOtp();
                if (OtpManager.otpObjCount <= 0) {
                    clearInterval(OtpManager.intervalInstance);
                    OtpManager.intervalInstance = null;
                }
            }, OtpManager.intervalTime);
        }
    }
}