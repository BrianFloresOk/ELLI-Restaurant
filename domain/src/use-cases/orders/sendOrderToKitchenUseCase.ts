import { Order } from "../../entities/Order";
interface SendOrderToKitchenInput {
    order: Order;
    waiterId: string;
}

export function sendOrderToKitchenUseCase(input: SendOrderToKitchenInput): Order {
    const { order, waiterId } = input;
    
    validateWaiter(waiterId);
    validateOrder(order, waiterId);

    order.status = "IN_PROGRESS";

    return order;

}

function validateOrder(order: Order, waiterId: string) {
    if (!order) {
        throw new Error("El pedido es requerido.");
    }

    if (order.waiterId !== waiterId) {
        throw new Error("Este mozo no tiene permisos para enviar este pedido.");
    }

    if (order.status !== "PENDING") {
        throw new Error(`Solo se pueden enviar a cocina pedidos pendientes.`);
    }

    if (!order.items || order.items.length === 0) {
        throw new Error("No se puede enviar un pedido vacío a cocina.");
    }
}

function validateWaiter(waiterId: string) : void {
    if (!waiterId) {
        throw new Error("El mozo es requerido para enviar el pedido a cocina.");
    }
}