import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { CreateUserDto } from "../../utils/dtos/createUserDto";
import { createUserUseCase, UserRol } from "domain-elli";
import { passwordManager } from "../../utils/passwordManager";
import { UserRepository } from "../../repositories/userRepository"

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