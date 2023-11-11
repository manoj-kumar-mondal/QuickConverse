import API from './axios';

enum ApiRoutes {
    GET_OTP = '/auth/signin',
    VERIFY_OTP = '/auth/verify-otp'
};

export const getOTPApi = (mobileNumber: string) => API.post(ApiRoutes.GET_OTP, { mobileNumber });

export const verifyOTPApi = (obj: { otp: string; token: string | null }) => API.post(ApiRoutes.VERIFY_OTP, obj);