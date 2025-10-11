import { Order } from "../../entities/Order";
import { OrderStatus } from "../../utils/types/OrderStatus";

interface ListOrdersByStatusInput {
    orders: Order[];
    status: OrderStatus;
}

export function listOrdersByStatusUseCase(input: ListOrdersByStatusInput): Order[] {
    const { orders, status } = input;

    if (!orders || orders.length === 0) {
        throw new Error("No hay pedidos disponibles.");
    }

    return orders.filter((order) => order.status === status);
}
