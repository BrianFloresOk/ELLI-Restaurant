import { Order } from "../../entities/order"
import { OrderService } from "../../services/orders/OrderService"

interface Payload {
    tableId: number
}

interface Dependencies {
    orderService: OrderService
}

interface InputUseCase {
    payload: Payload,
    dependencies: Dependencies
}

export const viewOrderByTableUseCase = async ({ dependencies, payload }: InputUseCase) => {
    const { orderService } = dependencies;
    const { tableId } = payload;

    const order: Order | null = await orderService.findByTableId(tableId)
    if (!order) {
        return null;
    }

    const items = await orderService.listItems(order.id)

    const orderWithDetails = {
        ...order,
        items
    }

    return orderWithDetails
}