import { Order } from "../../entities/Order";
import { OrderItem } from "../../entities/OrderItem";

function findItemIndex(items: OrderItem[], productId: string): number {
    return items.findIndex((item) => item.productId === productId);
}

export function findAndValidateItem(order: Order, productId: string, requiredOrderStatus: string): OrderItem {
    if (!order) {
        throw new Error("El pedido es requerido.");
    }
    if (!productId) {
        throw new Error("El ID del producto es requerido.");
    }

    if (order.status !== requiredOrderStatus) {
        throw new Error(`No se puede modificar un pedido con estado ${order.status}. Solo se permiten modificaciones en estado ${requiredOrderStatus}.`);
    }

    const itemIndex = findItemIndex(order.items, productId);
    if (itemIndex === -1) {
        throw new Error(`El producto con ID ${productId} no existe en el pedido.`);
    }

    return order.items[itemIndex];
}