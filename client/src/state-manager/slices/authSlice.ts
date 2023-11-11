import { createSlice } from "@reduxjs/toolkit";

type T_Token = string | null;

interface IState {
    loading: boolean;
    authToken: T_Token;
    loginToken: T_Token;
    isAuthenticated: boolean;
    errorMessage: string;
    successMessage: string;
};

const initialState: IState = {
    authToken: null,
    isAuthenticated: false,
    loading: false,
    loginToken: null,
    errorMessage: '',
    successMessage: '',
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
            state.authToken = action.payload.token;
            state.successMessage = action.payload.message || '';
        },

        verifyOtp: (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message || '';
            state.authToken = null;
            state.loginToken = action.payload.token;
        }
    }
});

export const { loader, errorHandler, getOtp, verifyOtp } = authSlice.actions;
export default authSlice.reducer;