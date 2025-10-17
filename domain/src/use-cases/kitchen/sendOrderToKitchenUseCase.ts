import { Order } from "../../entities/Order";
interface SendOrderToKitchenInput {
    order: Order;
    waiterId: number;
}

export function sendOrderToKitchenUseCase(input: SendOrderToKitchenInput): Order {
    const { order, waiterId } = input;
    
    validateWaiter(waiterId);
    validateOrder(order, waiterId);

    order.status = "OPEN";
    return order;

}

function validateOrder(order: Order, waiterId: number) {
    if (!order) {
        throw new Error("El pedido es requerido.");
    }

    if (order.waiterId !== waiterId) {
        throw new Error("Este mozo no tiene permisos para enviar este pedido.");
    }

    if (order.status !== "OPEN") {
        throw new Error(`Solo se pueden enviar a cocina pedidos que esten abiertos.`);
    }
}

function validateWaiter(waiterId: number) : void {
    if (!waiterId) {
        throw new Error("El mozo es requerido para enviar el pedido a cocina.");
    }
}