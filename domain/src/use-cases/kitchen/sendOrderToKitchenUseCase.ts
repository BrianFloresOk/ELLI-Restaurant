import { OrderService } from "../../services/orders/OrderService";

interface Dependencies {
    orderService: OrderService;
}

interface SendOrderToKitchenInput {
    dependencies: Dependencies;
    payload: {
        orderId: number;
        waiterId: number;
    };
}

export async function sendOrderToKitchenUseCase({ dependencies, payload }: SendOrderToKitchenInput): Promise<void> {
    const { orderService } = dependencies;
    const { orderId, waiterId } = payload;

    if (!waiterId) {
        throw new Error("El mozo es requerido para enviar el pedido a cocina.");
    }

    const order = await orderService.findById(orderId);
    if (!order) {
        throw new Error("Pedido no encontrado.");
    }

    if (Number(order.waiterId) !== Number(waiterId)) {
        throw new Error("Este mozo no tiene permisos para enviar este pedido.");
    }

    if (order.status !== "OPEN") {
        throw new Error(`Solo se pueden enviar a cocina pedidos que estén abiertos (estado: ${order.status}).`);
    }

    await orderService.updateItemStatusByOrder(orderId, "PENDING", "IN_PROGRESS");
}
