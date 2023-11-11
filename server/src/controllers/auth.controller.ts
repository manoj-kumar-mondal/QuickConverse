import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../schema/user.js';
import { e_HttpStatusCode } from './constraints.js';
import { OtpManager } from '../utils/otp-manager.js';
import { OtpStatus } from '../common/common.js';
import { jwtPrivateKey } from '../main.js';

export const signInHandler: RequestHandler = async (req, res) => {
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

export const otpVerificationHandler: RequestHandler = async (req, res) => {
    try {
        const { token, otp } = req.body;

        if (!token || !otp) {
            return res.status(e_HttpStatusCode.BAD_REQUEST).json({
                message: 'some fields are missing'
            });
        }

        const otpStatus = await OtpManager.verifyOtp(token, otp);
        let message = '', statuscode = e_HttpStatusCode.BAD_REQUEST;
        console.log(otpStatus);
        switch (otpStatus) {
            case OtpStatus.OTP_EXPIRED:
                message = 'otp expired';
                break;

            case OtpStatus.OTP_INCORRECT:
                message = 'incorrect otp provided';
                break;

            case OtpStatus.OTP_VERIFIED:
                message = 'otp verified';
                statuscode = e_HttpStatusCode.SUCCESS;
                break;

            case OtpStatus.OTP_ERROR:
            default:
                message: 'internal server error';
                statuscode: e_HttpStatusCode.INTERNAL_SERVER_ERROR;
                break;
        }

        if (otpStatus === OtpStatus.OTP_VERIFIED) {
            const mobileNumber = await OtpManager.getMobileNumber(token);

            if (mobileNumber !== OtpStatus.OTP_EXPIRED && mobileNumber !== OtpStatus.OTP_ERROR) {
                const user = await UserModel.findOne({ mobileNumber });

                if (user) {
                    const token = jwt.sign(user._id, jwtPrivateKey, { expiresIn: '1h' });

                    return res.status(200).json({
                        message, token
                    });

                } else {
                    const newUser = await UserModel.create({
                        mobileNumber,
                        userName: mobileNumber,
                    });

                    const token = jwt.sign(newUser._id, jwtPrivateKey, { expiresIn: '1h' });

                    return res.status(201).json({
                        message: 'new registration', token, isNew: true
                    });
                }
            }
        }

        res.status(statuscode).json({
            message,

        });

    } catch (error) {
        console.log(error);
    }
}