import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { CreateOrderDto, CreateOrderItemDto } from "../../utils/dtos/createOrderDto";
import { addItemToOrderUseCase, createOrderUseCase, listAllOrdersUseCase, Product } from "domain-elli";
import { OrderRepository } from "../../repositories/orderRepository";
import { TableRepository } from "../../repositories/tableRepository";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const payloadBody: CreateOrderDto = req.body;

        const dataNewOrder = {
            dependencies: { orderService: OrderRepository, tableService: TableRepository },
            payload: {
                tableId: payloadBody.tableId,
                waiterId: payloadBody.waiterId,
            }
        }

        await createOrderUseCase(dataNewOrder);

        successResponse({
            res,
            message: "Order created successfully",
            data: {},
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

export const addItemToOrder = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const payloadBody: CreateOrderItemDto = req.body;

        const dataAddItem = {
            dependencies: { orderService: OrderRepository },
            payload: {
                orderId,
                product: { id: payloadBody.productId } as Product,
                quantity: payloadBody.quantity,
                notes: payloadBody.notes,
            }
        }

        await addItemToOrderUseCase(dataAddItem);

        successResponse({
            res,
            message: "Item added to order successfully",
            data: {},
            statusCode: 201,
        });
    } catch (error) {
        errorResponse({
            res,
            message: "Error adding item to order",
            statusCode: 500,
        });
    }
}

export const listOrders = async (req: Request, res: Response) => {
    try {
        const orders = await listAllOrdersUseCase({ dependencies: { orderService: OrderRepository } });
        successResponse({
            res,
            message: "Orders retrieved successfully",
            data: orders,
            statusCode: 200,
        });
    } catch (error) {
        errorResponse({
            res,
            message: "Error retrieving orders",
            statusCode: 500,
        });
    }
}