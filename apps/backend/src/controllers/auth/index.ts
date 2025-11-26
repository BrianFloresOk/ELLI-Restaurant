import { passwordManager } from "../../utils/passwordManager";
import { UserRepository } from "../../repositories/userRepository"
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { loginUseCase } from "domain-elli";
import { tokenManager } from "../../utils/tokenManager";
import { generateCookie } from "../../utils/generateCookie";
import { LoginUserDto } from "../../utils/DTOs/loginUserDto";


export const login = async (req: Request, res: Response) => {
    try {
        const credentials: LoginUserDto = req.body;

        const data = {
            payload: { email: credentials.email, password: credentials.password },
            dependencies: {
                userService: UserRepository,
                passwordHasher: passwordManager,
                tokenGenerator: tokenManager
            }
        };

        const { accessToken, refreshToken } = await loginUseCase(data);

        const ACCESS_TOKEN_MAX_AGE = 1000 * 60 * 15;
        const REFRESH_TOKEN_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

        generateCookie(res, 'access_token', accessToken, ACCESS_TOKEN_MAX_AGE);
        generateCookie(res, 'refresh_token', refreshToken, REFRESH_TOKEN_MAX_AGE);

        return successResponse({
            res,
            message: "Login successful",
            data: { accessToken },
            statusCode: 200,
        });

    } catch (error) {
        errorResponse({
            res,
            message: error instanceof Error ? error.message : "Error logging in user",
            statusCode: 500,
        });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        console.log(refreshToken)
        if (!refreshToken) return res.sendStatus(401);

        const payload = await tokenManager.verifyRefresh(refreshToken);
        if (!payload) return res.sendStatus(403);

        const newAccessToken = await tokenManager.generate(payload);
        const ACCESS_TOKEN_MAX_AGE = 1000 * 60 * 15;
        generateCookie(res, 'access_token', newAccessToken, ACCESS_TOKEN_MAX_AGE);

        console.log(newAccessToken)

        return successResponse({
            res,
            message: "Access token renewed",
            data: { accessToken: newAccessToken },
            statusCode: 200,
        });

    } catch (error) {
        console.error("Error detallado en refreshToken:", error);
        errorResponse({ res, message: "Error refreshing token", statusCode: 500 });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return successResponse({
            res,
            message: "Logout successful",
            statusCode: 200,
        });
    } catch (error) {
        errorResponse({
            res,
            message: "Error logging out user",
            statusCode: 500,
        });
    }
};
