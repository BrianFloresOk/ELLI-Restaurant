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

        const { token } = await loginUseCase(data);

        generateCookie(res, 'access_token', token);

        if (token) {
            return successResponse({
                res,
                message: "Login successful",
                data: token,
                statusCode: 200,
            });
        }

    } catch (error) {
        errorResponse({
            res,
            message: "Error logging in user",
            statusCode: 500,
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('access_token');
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
