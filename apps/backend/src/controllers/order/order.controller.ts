import express, { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { CreateOrderDto } from "../../utils/dtos/createOrderDto";
import { createOrderUseCase } from "domain-elli";
import { OrderRepository } from "../../repositories/orderRepository";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const payloadBody: CreateOrderDto = req.body;

        const dataNewOrder = {
            dependencies: { orderService: OrderRepository },
            payload: {
                tableId: payloadBody.tableId,
                waiterId: payloadBody.waiterId,
            }
        }

        const order = await createOrderUseCase(dataNewOrder);

        successResponse({
            res,
            message: "Order created successfully",
            data: { },
            statusCode: 201,
        });
    } catch (error) {
        errorResponse({
            res,
            message: "Error creating order",
            statusCode: 500,
        });
    }
}