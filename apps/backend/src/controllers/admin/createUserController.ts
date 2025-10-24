import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { CreateUserDto } from "../../utils/DTOs/createUserDto";
import { passwordManager } from "../../utils/passwordManager";
import { UserRepository } from "../../repositories/userRepository"
import { UserRol } from "domain-elli/src/utils/types/UserRol";
import { createUserUseCase } from "domain-elli";

export const createUser = async (req: Request, res: Response) => {
    try {
        const userDto: CreateUserDto = req.body;
        const role = userDto.role = userDto.role.toUpperCase() as UserRol;

        const userPayload = { ...userDto, role };

        const data = {
            payload: userPayload,
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