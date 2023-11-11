import { readFile, writeFile } from 'node:fs/promises';
import { serverFilePath } from './constant.js';
import { OtpStatus } from '../common/common.js';

export class OtpManager {
    private _mobileNumber: string;
    private _otp: string;
    private _verificationToken: string;
    private _expiryTimeStamp: number;

    /* static variables */
    static readonly maxOtpLength = 4;
    static readonly expiryInTime = 2 * 60 * 1000; //2 mins
    static intervalInstance: any = null;
    static otpObjectLength: number = 0;

    constructor(mobileNumber: string) {
        this._mobileNumber = mobileNumber;
        this._otp = OtpManager.generateOtp();
        this._expiryTimeStamp = Date.now() + OtpManager.expiryInTime;
        this._verificationToken = OtpManager.createToken(this._mobileNumber, this._otp);
        OtpManager.insertObjectToList(this);
        OtpManager.monitorOtpManager();
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

    static async verifyOtp(token: string, otp: string): Promise<OtpStatus> {
        try {
            const list = await OtpManager.getFileData();
            let findToken = list.items.filter((item: any) => item._verificationToken === token);
            if (findToken.length === 0) {
                return OtpStatus.OTP_EXPIRED;
            }
            return (findToken[0]._otp === otp ? OtpStatus.OTP_VERIFIED : OtpStatus.OTP_INCORRECT);
        } catch (error) {
            return OtpStatus.OTP_ERROR;
        }
    }

    static async getMobileNumber(token: string): Promise<OtpStatus | string> {
        try {
            const list = await OtpManager.getFileData();
            let getToken: any = null;
            let otherItems = list.items.filter((item: any) => {
                if (item._verificationToken === token) {
                    getToken = item;
                } else {
                    return item;
                }
            });

            if (!getToken) {
                return OtpStatus.OTP_EXPIRED;
            }

            list.length = otherItems.length;
            list.items = otherItems
            await OtpManager.setFileData(list);
            return getToken._mobileNumber;
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
        const token = Buffer.from(`${key1}${key2}`).toString('base64');
        return token;
    }

    private static monitorOtpManager() {
        if (!OtpManager.intervalInstance) {
            OtpManager.intervalInstance = setInterval(async () => {
                await OtpManager.deleteExpiredObjects();
                if (OtpManager.otpObjectLength <= 0) {
                    clearInterval(OtpManager.intervalInstance);
                    OtpManager.intervalInstance = null;
                }
            }, OtpManager.expiryInTime);
        }
    }

    private static async insertObjectToList(otpObj: OtpManager) {
        try {
            const list = await OtpManager.getFileData();
            list.items.push(otpObj);
            list.length++;
            await OtpManager.setFileData(list);
            OtpManager.otpObjectLength++;
        } catch (error) {
            throw (error);
        }
    }

    private static async deleteExpiredObjects() {
        try {
            const list = await OtpManager.getFileData();
            const remainingItems = list.items.filter((item: any) => Date.now() < item._expiryTimeStamp);
            OtpManager.otpObjectLength = remainingItems.length;
            list.length = remainingItems.length;
            list.items = remainingItems;
            await OtpManager.setFileData(list);
        } catch (error) {
            throw (error);
        }
    }

    private static async getFileData() {
        try {
            const fileData = await readFile(serverFilePath.otpData, { encoding: 'utf-8' });
            const list = JSON.parse(fileData);
            return list;
        } catch (error) {
            throw (error);
        }
    }

    private static async setFileData(listData: object) {
        await writeFile(serverFilePath.otpData, JSON.stringify(listData), { encoding: 'utf-8' });
    }

}