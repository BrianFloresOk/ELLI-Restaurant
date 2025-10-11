import { Order } from "../../entities/Order";

interface MarkOrderAsReadyInput {
    order: Order;
    chefId: string;
}

export function markOrderAsReadyUseCase(input: MarkOrderAsReadyInput): Order {
    const { order, chefId } = input;

    if (!order) {
        throw new Error("El pedido es requerido.");
    }

    if (!chefId) {
        throw new Error("El ID del chef es requerido.");
    }

    if (order.status !== "IN_PROGRESS") {
        throw new Error("Solo se pueden marcar como listos los pedidos en progreso.");
    }

    order.status = "COMPLETED";

    return order;
}
