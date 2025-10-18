import { passwordManager } from "../../utils/passwordManager";
import { UserRepository } from "../../repositories/userRepository"
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { loginUseCase } from "domain-elli";
import { tokenManager } from "../../utils/tokenManager";


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const data = {
            payload: { email, password },
            dependencies: {
                userService: UserRepository,
                passwordHasher: passwordManager,
                tokenGenerator: tokenManager
            }
        };

        const user = await loginUseCase(data);

        if (user) {
            return successResponse({
                res,
                message: "Login successful",
                data: user,
                statusCode: 200,
            });
        }

    } catch (error) {
        errorResponse({
            res,
            message: "Error creating user",
            statusCode: 500,
        });
    }
};