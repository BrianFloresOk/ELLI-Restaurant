import { Order } from "../../entities/Order";
import { OrderService } from "../../services/orders/OrderService";

interface Dependencies {
    orderService: OrderService
}
interface ViewOrderInput {
    dependencies: Dependencies,
    orderId: number,
}

export function viewOrderInfoUseCase({ dependencies, orderId }: ViewOrderInput): Promise<Order | null> {
    const { orderService } = dependencies

    if (!orderId) {
        throw new Error("La orden es requerida.");
    }

    return orderService.findById(orderId)
}
