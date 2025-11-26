import { Order } from "../../entities/order";
import { OrderItem } from "../../entities/orderItem";

function findItemIndex(items: OrderItem[], productId: number): number {
    return items.findIndex((item) => item.productId === productId);
}

export function findAndValidateItem(order: Order, productId: number, requiredOrderStatus: string): OrderItem {
    if (!order) {
        throw new Error("El pedido es requerido.");
    }
    if (!productId) {
        throw new Error("El ID del producto es requerido.");
    }

    if (order.status !== requiredOrderStatus) {
        throw new Error(`No se puede modificar un pedido con estado ${order.status}. Solo se permiten modificaciones en estado ${requiredOrderStatus}.`);
    }

    if (!order.orderItems) throw new Error("No")

        const itemIndex = findItemIndex(order.orderItems, productId);
    if (itemIndex === -1) {
        throw new Error(`El producto con ID ${productId} no existe en el pedido.`);
    }

    return order.orderItems[itemIndex];
}