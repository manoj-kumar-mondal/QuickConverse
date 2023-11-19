import axios, { Axios } from 'axios';

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CLIENT_BASE_URL
});

export const getAuthCookieApi = () => AxiosInstance.get('/api/get-auth-cookie');

export const setAuthCookieApi = (token: string, age?: number) => AxiosInstance.post('/api/login', { token, age });

export const removeAuthCookieApi = () => AxiosInstance.get('/api/logout');