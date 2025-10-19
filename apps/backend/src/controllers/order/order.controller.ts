import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { CreateOrderDto, CreateOrderItemDto } from "../../utils/dtos/createOrderDto";
import { modifyItemInOrderUseCase, createOrderUseCase, listAllOrdersUseCase, sendOrderToKitchenUseCase } from "domain-elli";
import { OrderRepository } from "../../repositories/orderRepository";
import { TableRepository } from "../../repositories/tableRepository";
import { ProductRepository } from "../../repositories/productRepository";

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

        return successResponse({
            res,
            message: "Order created successfully",
            data: {},
            statusCode: 201,
        });
    } catch (error) {
        return errorResponse({
            res,
            message: "Error creating order",
            statusCode: 500,
        });
    }
}

export const modifyOrderItem = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const payloadBody: CreateOrderItemDto = req.body;

        const data = {
            dependencies: { orderService: OrderRepository, productService: ProductRepository },
            payload: {
                orderId,
                productId: payloadBody.productId,
                quantity: payloadBody.quantity,
                notes: payloadBody.notes,
            }
        };

        await modifyItemInOrderUseCase(data);

        return successResponse({
            res,
            message: "Order item modified successfully",
            data: {},
            statusCode: 200,
        });
    } catch (error) {
        return errorResponse({
            res,
            message: "Error modifying order item",
            statusCode: 500,
        });
    }
};
export const listOrders = async (req: Request, res: Response) => {
    try {
        const orders = await listAllOrdersUseCase({ dependencies: { orderService: OrderRepository } });
        return successResponse({
            res,
            message: "Orders retrieved successfully",
            data: orders,
            statusCode: 200,
        });
    } catch (error) {
        return errorResponse({
            res,
            message: "Error retrieving orders",
            statusCode: 500,
        });
    }
}

export const sendOrderToKitchen = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const waiterId = parseInt(req.body.waiterId);

        const data = {
            dependencies: { orderService: OrderRepository },
            payload: { orderId, waiterId }
        };

        await sendOrderToKitchenUseCase(data);

        return successResponse({
            res,
            message: "Order sent to kitchen successfully",
            data: {},
            statusCode: 200,
        });
    } catch (error) {
        return errorResponse({
            res,
            message: "Error sending order to kitchen",
            statusCode: 500,
        });
    }
};