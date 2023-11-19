import { createSlice } from "@reduxjs/toolkit";

type T_Token = string | null;
export type T_AuthWindow = 'otp-verification' | 'new-registration';

interface IState {
    loading: boolean;
    otpToken: T_Token;
    authToken: T_Token;
    isAuthenticated: boolean;
    errorMessage: string;
    successMessage: string;
    currentWindow: T_AuthWindow;
};

const initialState: IState = {
    otpToken: null,
    isAuthenticated: false,
    loading: false,
    authToken: null,
    errorMessage: '',
    successMessage: '',
    currentWindow: "otp-verification",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loader: (state) => {
            state.loading = true;
            state.errorMessage = '';
            state.successMessage = '';
        },

        errorHandler: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },

        getOtp: (state, action) => {
            state.loading = false;
            state.otpToken = action.payload.token;
        },


        verifyOtp: (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.otpToken = null;
            state.authToken = action.payload.token;

            if (action.payload.isRegistered) {
                state.isAuthenticated = true;
            } else {
                state.currentWindow = 'new-registration';
            }
        },

        newRegistration: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.successMessage = action.payload.message;
            state.currentWindow = 'otp-verification';
        },

        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        },

        logout: (state) => {
            state = initialState
        },
    }
});

export const authSliceAction = authSlice.actions;
export default authSlice.reducer;