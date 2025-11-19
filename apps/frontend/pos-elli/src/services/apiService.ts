import axios from "axios";
import type{ AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface ApiRequestConfig extends AxiosRequestConfig {
    useCredentials?: boolean;
}

interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    errors?: string[];
    data?: T;
}

export const apiRequest = async <T = unknown>(config: ApiRequestConfig): Promise<ApiResponse<T>> => {
    const { useCredentials = false, ...axiosConfig } = config;

    try {
        const response: AxiosResponse<ApiResponse<T>> = await axios({
            ...axiosConfig,
            withCredentials: useCredentials,
        });

        const resData = response.data;

        if (resData.success === false) {
            throw new Error(resData.errors?.[0] || resData.message || 'Error del servidor');
        }

        return resData;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;

        if (axiosError.response) {
            throw new Error(axiosError.response.data?.message || 'Error del servidor');
        } else if (axiosError.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error desconocido');
        }
    }
};
