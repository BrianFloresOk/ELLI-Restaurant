import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { viewOrdersPendingUseCase } from "domain-elli";
import { OrderRepository } from "../../repositories/orderRepository";
import { UserRepository } from "../../repositories/userRepository";
import { ProductRepository } from "../../repositories/productRepository";

export const viewOrdersPending = async (req: Request, res: Response) => {
    try {
        const dependencies = {
            orderService: OrderRepository,
            userService: UserRepository,
            productService: ProductRepository
        }

        const payload = {
            dependencies
        }

        const orders = await viewOrdersPendingUseCase(payload)
        
        return successResponse({
            res,
            message: "Orders retrieved successfully",
            data: orders,
            statusCode: 200,
        });

    } catch (error) {
        return errorResponse({
            res,
            message: "Error retrieved orders",
            statusCode: 500,
        });
    }
}