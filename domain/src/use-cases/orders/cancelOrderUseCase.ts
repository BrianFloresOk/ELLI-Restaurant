import { Order } from "../../entities/Order";

interface CancelOrderInput {
    order: Order;
    userId: string;
}

export function cancelOrderUseCase(input: CancelOrderInput): Order {
    const { order, userId } = input;

    if (!order) {
        throw new Error("El pedido es requerido.");
    }

    if (!userId) {
        throw new Error("El usuario que cancela el pedido es requerido.");
    }

    if (!["PENDING", "IN_PROGRESS"].includes(order.status)) {
        throw new Error("Solo se pueden cancelar pedidos pendientes o en progreso.");
    }

    order.status = "CANCELLED";

    return order;
}
