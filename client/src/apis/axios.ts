import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AXIOS_BASE_URL,
});

AxiosInstance.interceptors.response.use(res => res, error => {
    if (error.code === 'ERR_NETWORK') {
        // Handle backend network error
        error.message = 'Server is down please try again later'
    }
    return Promise.reject(error);
});

export default AxiosInstance;