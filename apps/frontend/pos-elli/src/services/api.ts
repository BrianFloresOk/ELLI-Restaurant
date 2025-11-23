import axios, { type AxiosRequestConfig, AxiosError, type AxiosResponse } from "axios";
import { getAccessToken, setAccessToken } from "./authToken.service";
import { authService } from "./auth.service";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
    withCredentials: true,
});


api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: AxiosResponse) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reject: (reason?: any) => void;
    originalRequest: AxiosRequestConfig;
}> = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((p) => {
        if (error) {
            p.reject(error);
        } else {
            if (token && p.originalRequest.headers) {
                p.originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            api.request(p.originalRequest).then(p.resolve).catch(p.reject);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (res) => res,
    async (err: AxiosError) => {
        const originalRequest = err.config as AxiosRequestConfig & { _retry?: boolean };

        if (!err.response || err.response.status !== 401) {
            return Promise.reject(err);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((originalRequest as any)?._retry) {
            return Promise.reject(err);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject, originalRequest });
            });
        }

        isRefreshing = true;
        originalRequest._retry = true;

        try {
            const refreshResp = await authService.refresh();
            const newAccessToken = refreshResp.data?.accessToken as string | undefined;

            if (!newAccessToken) {
                throw new Error("No new access token from refresh");
            }
            setAccessToken(newAccessToken);
            processQueue(null, newAccessToken);

            if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return api.request(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            setAccessToken(null);
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default api;
