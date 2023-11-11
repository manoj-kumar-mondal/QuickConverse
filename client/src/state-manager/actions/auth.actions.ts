import { Dispatch } from "@reduxjs/toolkit";
import { errorHandler, getOtp, loader, verifyOtp } from "../slices/authSlice"
import { getOTPApi, verifyOTPApi } from "@/apis";
import store from "../store";


export const getOTPAction = (mobileNumber: string, setOTP: any) => async (dispatch: Dispatch) => {
    dispatch(loader());

    try {
        const { data } = await getOTPApi(mobileNumber);
        setOTP(data.otp);
        dispatch(getOtp(data));
    } catch (error) {
        console.log(error);
        dispatch(errorHandler('error occurred'));
    }
}

export const verifyOTPAction = (otp: string) => async (dispatch: Dispatch) => {
    dispatch(loader());

    try {
        const authState = store.getState().auth;
        const { data } = await verifyOTPApi({ otp, token: authState.authToken });
        dispatch(verifyOtp({
            message: data.message || '',
            token: data.token || null,
            isNew: data?.isNew !== undefined
        }));
    } catch (error) {
        console.log(error);
        dispatch(errorHandler('error occurred'));
    }
}