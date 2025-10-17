import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { CreateUserDto } from "../../utils/DTOs/createUserDto";
import { createUserUseCase } from "domain-elli"
import { passwordManager } from "../../utils/passwordManager";
import { UserRepository } from "../../repositories/userRepository"

export const createUser = async (req: Request, res: Response) => {
    try {
        const userData: CreateUserDto = req.body;
        const data = {
            payload: userData,
            dependencies: {
                userService: UserRepository,
                passwordHasher: passwordManager,
            }
        }

        const user = await createUserUseCase(data);
        successResponse({
            res,
            message: "User created successfully",
            data: user,
            statusCode: 201,
        });
    } catch (error) {
        errorResponse({
            res,
            message: "Error creating user",
            statusCode: 500,
        });
    }
}