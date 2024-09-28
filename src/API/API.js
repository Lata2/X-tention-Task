import axios from 'axios';
import * as siteConfig from '../Configu/Config';

const API = axios.create({
    baseURL: siteConfig.default.apiBaseURL,
    timeout: siteConfig.default.apiTimeout,
    withCredentials: true, // Ensure credentials are sent with requests
});

// Request Interceptor
API.interceptors.request.use(
    (config) => {
        // Optionally, you can add authorization tokens here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error); // Explicitly return the rejected promise
    }
);

// Response Interceptor
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Log the error or handle specific status codes here
        console.error('API Error:', error);
        return Promise.reject(error); // Explicitly return the rejected promise
    }
);

export default API;
