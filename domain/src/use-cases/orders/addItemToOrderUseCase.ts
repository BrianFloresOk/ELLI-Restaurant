import { Order } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { OrderItem } from "../../entities/OrderItem";
import { OrderService } from "../../services/orders/OrderService";

interface Payload {
    order: Order;
    product: Product;
    quantity: number;
}

interface AddItemInput {
    dependencies: { orderService: OrderService };
    payload: Payload;
}

export async function addItemToOrderUseCase({ dependencies, payload }: AddItemInput): Promise<Order> {
    const { orderService } = dependencies;
    const { order, product, quantity } = payload;

    validateInput(order, product, quantity);

    const existingItem = findExistingItem(order, product.id);

    if (existingItem) {
        increaseItemQuantity(existingItem, quantity);
        updateSubtotal(existingItem);
    } else {
        const newItem = createOrderItem(order.id, product, quantity);
        order.items.push(newItem);
    }

    order.total = calculateOrderTotal(order.items);
    await orderService.update(order.id, order);

    return order;
}

function validateInput(order: Order, product: Product, quantity: number): void {
    if (!order) throw new Error("El pedido es requerido.");
    if (!product?.id) throw new Error("El producto es inválido.");
    if (quantity <= 0) throw new Error("La cantidad debe ser mayor que cero.");

    const validStatuses = ["OPEN"];
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

function updateSubtotal(item: OrderItem): void {
    item.subtotal = item.quantity * item.unitPrice;
}

function createOrderItem(orderId: string, product: Product, quantity: number): OrderItem {
    return {
        id: crypto.randomUUID(),
        orderId,
        productId: product.id,
        quantity,
        unitPrice: product.price,
        subtotal: product.price * quantity,
        status: "PENDING"
    };
}

function calculateOrderTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.subtotal, 0);
}