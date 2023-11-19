import API from './axios';

enum ApiRoutes {
    GET_OTP = '/auth/signin',
    VERIFY_OTP = '/auth/verify-otp',
    NEW_REGISTRATION = '/auth/new-registration',
};

export const getOTPApi = (mobileNumber: string) => API.post(ApiRoutes.GET_OTP, { mobileNumber });

export const verifyOTPApi = (obj: { otp: string; token: string | null }) => API.post(ApiRoutes.VERIFY_OTP, obj);

export const newRegistrationApi = (userName: string, email: string) => API.post(ApiRoutes.NEW_REGISTRATION, { userName, email });
