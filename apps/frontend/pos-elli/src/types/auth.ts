import { type AxiosRequestConfig } from 'axios';

export interface ApiRequestConfig extends AxiosRequestConfig {
    useCredentials?: boolean;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    errors?: string[];
    data?: T;
}

export interface JwtPayload {
    id: number;
    email: string;
    role: 'ADMIN' | 'WAITER' | 'CASHIER';
    iat: number;
    exp: number;
}

export type User = Omit<JwtPayload, 'iat' | 'exp'>


export interface AuthTokenResponseData {
    token: string;
    refreshToken?: string;
}