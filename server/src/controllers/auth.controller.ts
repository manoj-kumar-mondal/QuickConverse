import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../schema/user.schema.js';
import { e_HttpStatusCode } from './constraints.js';
import { OtpManager } from '../utils/otp-manager.js';
import { OtpStatus } from '../common/common.js';
import { jwtPrivateKey } from '../main.js';

export default class AuthController {
    static readonly jwtTokenTimeOut = 2 * 60 * 3600; // 2 hrs

    constructor() { }

    public async signInHandler(req: Request, res: Response) {
        const { mobileNumber } = req.body;

        if (!mobileNumber || mobileNumber.length != 10) {
            return res.status(e_HttpStatusCode.BAD_REQUEST).json({
                message: 'please provide valid phone number'
            });
        }

        /* Creating otp object for further verification */
        const otpManager = new OtpManager(mobileNumber);

        res.status(e_HttpStatusCode.SUCCESS).json({
            otp: otpManager.otp,
            token: otpManager.verificationToken
        });
    }

    public async otpVerificationHandler(req: Request, res: Response) {
        try {
            const { token, otp } = req.body;
            let mobileNumber = '';

            if (!token || !otp) {
                return res.status(e_HttpStatusCode.BAD_REQUEST).json({
                    message: 'some fields are missing'
                });
            }

            /* default message and status code */
            let message = 'internal server error', statuscode = e_HttpStatusCode.INTERNAL_SERVER_ERROR;
            const otpStatus = await OtpManager.verifyOtp(token, otp);

            switch (otpStatus) {
                case OtpStatus.OTP_EXPIRED:
                    message = 'otp expired';
                    break;

                case OtpStatus.OTP_INCORRECT:
                    message = 'incorrect otp provided';
                    break;

                case OtpStatus.OTP_ERROR:
                    break;

                default:
                    if (typeof otpStatus === 'string') {
                        mobileNumber = otpStatus;
                        message = 'otp verified'
                    }
                    break;
            }

            if (mobileNumber) {
                const user = await UserModel.findOne({ mobileNumber });

                if (user) {
                    const token = AuthController.generateJwtToken(user._id.toString());

                    return res.status(200).json({
                        message, token
                    });

                } else {
                    const newUser = await UserModel.create({
                        mobileNumber,
                        userName: mobileNumber,
                    });

                    const token = AuthController.generateJwtToken(newUser._id.toString());

                    return res.status(201).json({
                        message: 'newly registered', token
                    });
                }
            }

            res.status(statuscode).json({
                message,
            });

        } catch (error) {
            console.log(error);
        }
    }

    private static generateJwtToken(id: string): string {
        const token = jwt.sign({
            id, time: Date.now()
        }, jwtPrivateKey, { expiresIn: AuthController.jwtTokenTimeOut });
        return token;
    }

    private static validateIncomingToken(token: string) {
        // validate auth token
    }
}