import { Schema, model } from 'mongoose';

const otpSchema = new Schema({
    otp: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    expiryTime: {
        type: Number,
        required: true
    },
});

const OtpModel = model('otp', otpSchema);

export default OtpModel;