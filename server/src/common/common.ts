import { FileError } from "./errors.js";
import { QcLog } from "./quick-converse.js"

export enum OtpStatus {
    OTP_INCORRECT = 0,
    OTP_VERIFIED = 1,
    OTP_EXPIRED = 2,
    OTP_ERROR = 3
}

export const ErrorHandler = (error: FileError) => {
    QcLog.error(`<${error.name}> "${error.message}"`);
}