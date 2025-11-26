import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { CreateUserDto } from "../../utils/DTOs/createUserDto";
import { passwordManager } from "../../utils/passwordManager";
import { UserRepository } from "../../repositories/userRepository"
import {
    createUserUseCase,
    viewUserListUseCase,
    activateUserUseCase,
    deactivateUserUseCase,
    UserRol
} from "domain-elli";

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

export const deactivateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);

        const dependencies = {
            userService: UserRepository,
        };

        const deactivateInput = {
            payload: { userId },
            dependencies,
        };

        await deactivateUserUseCase(deactivateInput);
        successResponse({
            res,
            message: "User deactivated successfully",
            statusCode: 200,
        });
    } catch (error) {
        errorResponse({
            res,
            message: "Error deactivating user",
            statusCode: 500,
        });
    }
};

export const activateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const dependencies = {
            userService: UserRepository,
        };

        const payload = { userId };
        const activateInput = {
            payload,
            dependencies,
        };
        await activateUserUseCase(activateInput);
        successResponse({
            res,
            message: "User activated successfully",
            statusCode: 200,
        });
    } catch (error) {
        errorResponse({
            res,
            message: "Error activating user",
            statusCode: 500,
        });
    }
};

export const viewUserList = async (req: Request, res: Response) => {
    try {
        const dependencies = {
            userService: UserRepository,
        };
        const userList = await viewUserListUseCase({
            dependencies,
        });
        successResponse({
            res,
            message: "User list retrieved successfully",
            data: userList,
            statusCode: 200,
        });
    } catch (error) {
        errorResponse({
            res,
            message: "Error retrieving user list",
            statusCode: 500,
        });
    }
};