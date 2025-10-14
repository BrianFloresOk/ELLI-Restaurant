// src/domain/use-cases/orders/listOrdersByStatusUseCase.ts
import { Order } from "../../entities/Order";
import { OrderService } from "../../services/orders/OrderService";
import { OrderStatus } from "../../utils/types/OrderStatus";

interface Dependencies {
    orderService: OrderService;
}

interface Input {
    dependencies: Dependencies;
    status: OrderStatus;
}

export async function listOrdersByStatusUseCase({
    dependencies,
    status
}: Input): Promise<Order[]> {
    const { orderService } = dependencies;

    const orders = await orderService.findByStatus(status);

    if (!orders || orders.length === 0) {
        throw new Error(`No hay pedidos con el estado "${status}".`);
    }

    return orders;
}
