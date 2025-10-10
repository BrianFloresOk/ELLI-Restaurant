import { Order } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { OrderItem } from "../../entities/OrderItem";
import { OrderStatus } from "../../utils/types/OrderStatus";

interface AddItemToOrderInput {
    order: Order;
    product: Product;
    quantity: number;
}

export function addItemToOrderUseCase(input: AddItemToOrderInput): Order {
    const { order, product, quantity } = input;

    validateInput(order, product, quantity);

    const existingItem = findExistingItem(order, product.id);

    if (existingItem) {
        increaseItemQuantity(existingItem, quantity);
    } else {
        const newItem = createOrderItem(order.id, product, quantity);
        order.items.push(newItem);
    }

    order.total = calculateOrderTotal(order.items);
    order.status = updateOrderStatus(order.status);

    return order;
}

function validateInput(order: Order, product: Product, quantity: number): void {
    if (!order) throw new Error("El pedido es requerido.");
    if (!product?.id) throw new Error("El producto es inválido.");
    if (quantity <= 0) throw new Error("La cantidad debe ser mayor que cero.");

    const validStatuses = ["PENDING", "IN_PROGRESS"];
    if (!validStatuses.includes(order.status)) {
        throw new Error(`No se puede modificar un pedido con estado ${order.status}.`);
    }
}

function findExistingItem(order: Order, productId: string): OrderItem | undefined {
    return order.items?.find((item) => item.productId === productId);
}

function increaseItemQuantity(item: OrderItem, quantity: number): void {
    item.quantity += quantity;
}

function createOrderItem(orderId: string, product: Product, quantity: number): OrderItem {
    return {
        id: crypto.randomUUID(),
        orderId,
        productId: product.id,
        quantity,
        unitPrice: product.price,
        subtotal: product.price * quantity
    };
}

function calculateOrderTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

function updateOrderStatus(currentStatus: OrderStatus): OrderStatus {
    return currentStatus === "PENDING" ? "IN_PROGRESS" : currentStatus;
}
