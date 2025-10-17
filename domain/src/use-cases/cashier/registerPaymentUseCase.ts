import { Order } from "../../entities/Order";
import { Payment } from "../../entities/Payment";

interface RegisterPaymentInput {
    order: Order;
    method: Payment["method"];
    amount: number;
    cashierId: string;
}

export function registerPaymentUseCase(input: RegisterPaymentInput): Order {
    const { order, method, amount, cashierId } = input;

    if (!order) {
        throw new Error("La orden es requerida.");
    }

    if (order.status === "CANCELLED") {
        throw new Error("No se puede registrar un pago en una orden cancelada.");
    }

    if (order.status === "CLOSED") {
        throw new Error("La orden ya está cerrada.");
    }

    if (amount <= 0) {
        throw new Error("El monto del pago debe ser mayor que cero.");
    }

    if (!cashierId) {
        throw new Error("El cajero es requerido para registrar el pago.");
    }

    // Crear el pago
    const payment: Payment = {
        id: crypto.randomUUID(),
        orderId: Number(order.id),
        method,
        amount,
        paidAt: new Date()
    };

    // Actualizar orden
    const updatedOrder: Order = {
        ...order,
        status: "CLOSED"
    };

    return updatedOrder;
}
