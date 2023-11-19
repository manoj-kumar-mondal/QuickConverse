import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '../schema/user.schema.js';
import { e_HttpStatusCode } from './constraints.js';
import { OtpManager } from '../utils/otp-manager.js';
import { OtpStatus } from '../common/common.js';
import { jwtPrivateKey } from '../main.js';

export default class AuthController {
    static readonly jwtTokenTimeOut = 2 * 60 * 60; // 2 hrs

    constructor() { }

    public static async signInHandler(req: Request, res: Response) {
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

    public static async otpVerificationHandler(req: Request, res: Response) {
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
                    statuscode = e_HttpStatusCode.BAD_REQUEST;
                    break;

                case OtpStatus.OTP_INCORRECT:
                    message = 'incorrect otp provided';
                    statuscode = e_HttpStatusCode.BAD_REQUEST;
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
                    /* User already registered */
                    const token = AuthController.generateJwtToken(user._id.toString());

                    return res.status(e_HttpStatusCode.SUCCESS).json({
                        message, token, expiryTime: AuthController.jwtTokenTimeOut, isRegistered: user.isRegistered
                    });

                } else {
                    /* Creating new user */
                    const newUser = await UserModel.create({
                        mobileNumber,
                        userName: mobileNumber,
                        isRegistered: false
                    });

                    const token = AuthController.generateJwtToken(newUser._id.toString());

                    return res.status(e_HttpStatusCode.CREATED).json({
                        message: 'newly registered', token, expiryTime: AuthController.jwtTokenTimeOut, isRegistered: false
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

    public static async newRegistrationHandler(req: Request, res: Response) {
        const { userName, email } = req.body;
        const userId = res.get('user-id');
        try {
            if (!userName) {
                return res.status(e_HttpStatusCode.BAD_REQUEST).json({
                    message: 'please provide a user name'
                });
            }

            if (email && !AuthController.isEmail(email)) {
                return res.status(e_HttpStatusCode.BAD_REQUEST).json({
                    message: 'please provide a valid email'
                });
            }

            const user = await UserModel.findByIdAndUpdate(userId, {
                userName, email, isRegistered: true
            });

            res.status(e_HttpStatusCode.SUCCESS).json({
                message: 'new-user details updated',
                isRegistered: true
            });

        } catch (error) {
            console.log(error);
        }


    }

    private static isEmail(email: string): boolean {
        if (!email.includes('.') || !email.includes('@')) {
            return false;
        }
        if (email.lastIndexOf('@') > email.lastIndexOf('.')) {
            return false;
        }
        return true;
    }

    private static generateJwtToken(id: string): string {
        const token = jwt.sign({
            id, time: Date.now()
        }, jwtPrivateKey, { expiresIn: AuthController.jwtTokenTimeOut, });
        return token;
    }

    public static async validatedRoute(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;
        const token = authorization?.split(' ')[1] // Format: 'Bearer token'

        if (!token) {
            return res.status(e_HttpStatusCode.UNAUTHORIZED).json({
                message: 'token not found'
            });

        } else {
            try {
                const verifyToken = jwt.verify(token, jwtPrivateKey) as JwtPayload;
                const userId = verifyToken?.id || '';
                res.set('user-id', userId);

            } catch (error: any) {
                if (error.name === 'TokenExpiredError') {
                    return res.status(e_HttpStatusCode.FORBIDDEN).json({
                        message: 'auth token expired'
                    });
                } else if (error.name === 'JsonWebTokenError') {
                    return res.status(e_HttpStatusCode.FORBIDDEN).json({
                        message: 'auth token mismatched'
                    });
                }
            }
        }
        next();
    }

}