import { Order } from "../../entities/order";
import { OrderService } from "../../services/orders/OrderService";


interface Dependencies {
    orderService: OrderService
}
interface CancelOrderInput {
    dependencies: Dependencies
    payload: {
        orderId: number;
        userId: number;
    }
}

export async function cancelOrderUseCase({ dependencies, payload }: CancelOrderInput): Promise<Order> {
    const { orderId, userId } = payload;
    const { orderService } = dependencies;

    if (!orderId) {
        throw new Error("El pedido es requerido.");
    }

    if (!userId) {
        throw new Error("El usuario que cancela el pedido es requerido.");
    }

    const order = await orderService.findById(orderId);
    if(!order) {
        throw new Error("No se encontró el pedido")
    }
    
    order.status = "CANCELLED";

    orderService.update(orderId, order)

    return order;
}
