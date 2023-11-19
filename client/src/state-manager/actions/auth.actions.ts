import { Dispatch } from "@reduxjs/toolkit";
import { authSliceAction } from "../slices/authSlice"
import { getOTPApi, newRegistrationApi, removeAuthCookieApi, setAuthCookieApi, verifyOTPApi } from "@/apis";
import store from "../store";

const getErrorMessage = (error: any) => {
    const errorMessage = error?.response?.data?.message || error?.message || 'something went wrong';
    return errorMessage;
}

export const getOTPAction = (mobileNumber: string, setOTP: any) => async (dispatch: Dispatch) => {
    dispatch(authSliceAction.loader());

    try {
        const { data } = await getOTPApi(mobileNumber);
        setOTP(data.otp);
        dispatch(authSliceAction.getOtp({
            message: data?.message || '',
            token: data?.token || null
        }));
    } catch (error) {
        dispatch(authSliceAction.errorHandler(getErrorMessage(error)));
    }
}

export const verifyOTPAction = (otp: string) => async (dispatch: Dispatch) => {
    dispatch(authSliceAction.loader());

    try {
        const authState = store.getState().auth;
        const { data } = await verifyOTPApi({ otp, token: authState.otpToken });

        if (data?.token) {
            const age = data?.expiryTime || undefined;
            await setAuthCookieApi(data.token, age);
        }

        dispatch(authSliceAction.verifyOtp({
            message: data.message || '',
            token: data.token || null,
            isRegistered: data.isRegistered || false
        }));
    } catch (error) {
        dispatch(authSliceAction.errorHandler(getErrorMessage(error)));
    }
}

export const newRegistrationAction = (userName: string, email: string) => async (dispatch: Dispatch) => {
    dispatch(authSliceAction.loader());

    try {
        const { data } = await newRegistrationApi(userName, email);
        dispatch(authSliceAction.newRegistration({
            message: data?.message || '',
        }));
    } catch (error) {
        dispatch(authSliceAction.errorHandler(getErrorMessage(error)));
    }
}

export const logoutAction = () => async (dispatch: Dispatch) => {
    dispatch(authSliceAction.loader());

    try {
        const { data } = await removeAuthCookieApi();
        dispatch(authSliceAction.logout())
    } catch (error) {
        dispatch(authSliceAction.errorHandler(getErrorMessage(error)));
    }
}