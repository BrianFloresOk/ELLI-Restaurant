import { Request, Response } from "express";
import { CreatePaymentDto } from "../../utils/dtos/createPaymentDto";
import { Payment, registerPaymentUseCase } from "domain-elli";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { OrderRepository } from "../../repositories/orderRepository";
import { PaymentRepository } from "../../repositories/paymentRepository";

export const registerPayment = async (req: Request, res: Response) => {
    try {
        const payloadBody: CreatePaymentDto = req.body;
        const dependencies = {
            orderService: OrderRepository,
            paymentService: PaymentRepository,
        }

        const data = {
            dependencies,
            payload: {
                orderId: payloadBody.orderId,
                method: payloadBody.method as Payment["method"],
                amount: payloadBody.amount,
                cashierId: payloadBody.cashierId,
            }
        }

        await registerPaymentUseCase(data);
        return successResponse({
            res,
            message: "Payment created successfully",
            statusCode: 201,
        });

    } catch (error) {
        return errorResponse({
            res,
            message: "Error creating payment",
            statusCode: 500,
        });
    }
};