import axios from 'axios';
import { authSliceAction } from '@/state-manager/slices';
import { getAuthCookieApi } from './client-apis';
import store from '@/state-manager/store';

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
});

AxiosInstance.interceptors.request.use(async (req) => {
    try {
        /* Get token from the store */
        let token = store.getState().auth.authToken;

        if (!token) {
            /* if token is not available from store, it will get from the cookie */
            const { data } = await getAuthCookieApi();
            token = data.cookie;
            /* Also set the auth token value with the token, which is got from cookie */
            store.dispatch(authSliceAction.setAuthToken(token));
        }
        req.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
        console.log(error);
    } finally {
        return req;
    }
});

AxiosInstance.interceptors.response.use(res => res, error => {
    if (error.code === 'ERR_NETWORK') {
        // Handle backend network error
        error.message = 'Server is down please try again later'
    }
    console.log(error); // wii be removed after development
    return Promise.reject(error);
});

export default AxiosInstance;