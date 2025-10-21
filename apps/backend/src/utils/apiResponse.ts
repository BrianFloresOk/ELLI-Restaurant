import { Response } from "express";

export interface ErrorDetail {
    field?: string;
    message: string;
}

export interface SuccessResponse<T> {
    success: true;
    message: string;
    data?: T;
}

export interface ErrorResponse {
    success: false;
    message: string;
    errors?: ErrorDetail[];
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

type SuccessOptions<T> = {
    res: Response;
    message: string;
    data?: T;
    statusCode?: number;
};

type ErrorOptions = {
    res: Response;
    message: string;
    errors?: ErrorDetail[];
    statusCode?: number;
};

export function successResponse<T>({
    res,
    message,
    data,
    statusCode = 200,
}: SuccessOptions<T>): Response {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    } as SuccessResponse<T>);
}

export function errorResponse({
    res,
    message,
    errors = [],
    statusCode = 400,
}: ErrorOptions): Response {
    return res.status(statusCode).json({
        success: false,
        message,
        errors,
    } as ErrorResponse);
}
