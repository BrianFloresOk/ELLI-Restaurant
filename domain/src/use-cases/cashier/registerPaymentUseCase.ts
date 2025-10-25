import { PaymentService } from "domain/src/services/payment/PaymentService";
import { Order } from "../../entities/Order";
import { Payment } from "../../entities/Payment";
import { OrderService } from "domain/src/services";
import { OrderNotFound } from "../../utils/errors/OrderErrors";

interface Dependencies {
    paymentService: PaymentService;
    orderService: OrderService;
}

interface Payload {
    orderId: number;
    method: Payment["method"];
    amount: number;
    cashierId: number;
}

interface RegisterPaymentInput {
    dependencies: Dependencies;
    payload: Payload;
}

type CreatePaymentData = Omit<Payment, "id">;

export async function registerPaymentUseCase({ dependencies, payload }: RegisterPaymentInput): Promise<void> {
    const { orderId, method, amount, cashierId } = payload;
    const { paymentService, orderService } = dependencies;

    const order = await orderService.findById(orderId);
    if (!order) {
        throw new OrderNotFound("Orden no encontrada.");
    }

    validatePaymentData(order, method, amount, cashierId);

    const payment: CreatePaymentData = {
        orderId: order.id,
        method,
        amount,
        paidAt: new Date(),
    };

    await paymentService.save(payment);
    const updatedOrder: Order = {
        ...order,
        status: "IS_PAID",
        cashierId: cashierId,
    };
    await orderService.update(order.id, updatedOrder);

}

function validatePaymentData(order: Order, method: string, amount: number, cashierId: number) {
    if (order.status !== "CLOSED") {
        throw new Error("Order must be closed.");
    }
    if (!method) {
        throw new Error("Payment method is required.");
    }
    if (amount <= 0) {
        throw new Error("Payment amount must be greater than zero.");
    }
    if (!cashierId) {
        throw new Error("Cashier ID is required.");
    }
}

