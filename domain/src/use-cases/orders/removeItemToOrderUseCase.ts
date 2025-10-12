import { Order } from "../../entities/Order";
import { OrderItem } from "../../entities/OrderItem";
import { ItemOrderStatus } from "../../utils/types/ItemOrderStatus";

interface RemoveItemFromOrderInput {
    order: Order;
    productId: string;
}

export function removeItemFromOrderUseCase(input: RemoveItemFromOrderInput): Order {
    const { order, productId } = input;

    validateInput(order, productId);

    const itemIndex = findItemIndex(order.items, productId);

    if (itemIndex === -1) {
        throw new Error(`El producto con ID ${productId} no existe en el pedido.`);
    }

    const itemToRemove = order.items[itemIndex];
    const REMOVABLE_STATUS: ItemOrderStatus = 'PENDING';

    if (itemToRemove.status !== REMOVABLE_STATUS) {
        throw new Error(`No se puede eliminar el producto. Su estado actual es ${itemToRemove.status}. Solo se pueden eliminar artículos en estado ${REMOVABLE_STATUS}.`);
    }

    order.items.splice(itemIndex, 1);
    order.total = calculateOrderTotal(order.items);

    return order;
}

function validateInput(order: Order, productId: string): void {
    if (!order) throw new Error("El pedido es requerido.");
    if (!productId) throw new Error("El ID del producto es requerido.");

    const validStatuses = ["OPEN"];
    if (!validStatuses.includes(order.status)) {
        throw new Error(`No se puede modificar un pedido con estado ${order.status}.`);
    }
}

function findItemIndex(items: OrderItem[], productId: string): number {
    return items.findIndex((item) => item.productId === productId);
}

function calculateOrderTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}