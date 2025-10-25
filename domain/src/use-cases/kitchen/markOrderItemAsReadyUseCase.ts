import { OrderService } from "../../services/orders/OrderService";
import { OrderNotFound } from "../../utils/errors/OrderErrors";

interface Dependencies {
    orderService: OrderService;
}

interface MarkOrderItemAsReadyInput {
    dependencies: Dependencies;
    payload: {
        orderId: number;
    };
}

type StatusPrevious = "IN_PROGRESS";
type StatusNew = "COMPLETED";

export async function markOrderItemAsReadyUseCase({ payload, dependencies }: MarkOrderItemAsReadyInput): Promise<void> {
    const { orderId } = payload;
    const { orderService } = dependencies;
    const order = await orderService.findById(orderId);
    if (!order) {
        throw new OrderNotFound("Pedido no encontrado.");
    }

    if (order.status !== "OPEN") {
        throw new Error(`Solo se pueden enviar a cocina pedidos que estén abiertos (estado: ${order.status}).`);
    }

    const statusPrevious: StatusPrevious = "IN_PROGRESS";
    const statusNew: StatusNew = "COMPLETED";

    await orderService.updateItemStatusByOrder(orderId, statusPrevious, statusNew);

}