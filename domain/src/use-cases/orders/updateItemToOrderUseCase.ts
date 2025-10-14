import { Order } from "../../entities/Order";
import { OrderItem } from "../../entities/OrderItem";
import { OrderService } from "../../services/orders/OrderService";

interface UpdateItemQuantityInput {
    dependencies: { orderService: OrderService };
    payload: {
        order: Order;
        productId: string;
        newQuantity: number;
    };
}

export function updateItemToOrderUseCase({ dependencies, payload }: UpdateItemQuantityInput): Order {
    const { orderService } = dependencies;
    const { order, productId, newQuantity } = payload;

    validateInput(order, productId, newQuantity);

    const item = findItem(order.items, productId);
    if (!item) {
        throw new Error(`El producto con ID ${productId} no existe en la orden.`);
    }

    item.quantity = newQuantity;
    order.total = calculateOrderTotal(order.items);

    return order;
}

function validateInput(order: Order, productId: string, newQuantity: number): void {
    if (!order) throw new Error("El pedido es requerido.");
    if (!productId) throw new Error("El ID del producto es requerido.");
    if (newQuantity <= 0) throw new Error("La cantidad debe ser mayor que cero.");

    const validStatuses = ["OPEN"];
    if (!validStatuses.includes(order.status)) {
        throw new Error(`No se puede modificar un pedido con estado ${order.status}.`);
    }
}

function findItem(items: OrderItem[], productId: string): OrderItem | undefined {
    return items.find((item) => item.productId === productId);
}
function calculateOrderTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
