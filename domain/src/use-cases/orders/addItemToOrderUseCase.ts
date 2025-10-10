import { Order } from "../../entities/Order";
import { OrderItem } from "../../entities/OrderItem";
import { Product } from "../../entities/Product";

interface AddItemToOrderInput {
    order: Order;
    product: Product;
    quantity: number;
}

/**
 * Caso de uso: Agregar un ítem a un pedido existente.
 * - Solo permite modificar pedidos que estén abiertos (PENDING o IN_PROGRESS).
 * - Si el producto ya está en la orden, suma la cantidad.
 * - Recalcula el total.
 */
export function addItemToOrderUseCase(input: AddItemToOrderInput): Order {
    const { order, product, quantity } = input;

    if (!order) {
        throw new Error("El pedido es requerido.");
    }

    if (!product || !product.id) {
        throw new Error("El producto es inválido.");
    }

    if (quantity <= 0) {
        throw new Error("La cantidad debe ser mayor que cero.");
    }

    if (!["PENDING", "IN_PROGRESS"].includes(order.status)) {
        throw new Error(
            `No se puede modificar un pedido con estado ${order.status}.`
        );
    }

    // Buscar si el producto ya existe en la orden
    const existingItemInOrder = order.items?.find(
        (item) => item.productId === product.id
    );

    if (existingItemInOrder) {
        existingItemInOrder.quantity += quantity;
    } else {
        const newItem: OrderItem = {
            id: crypto.randomUUID(),
            orderId: order.id,
            productId: product.id,
            quantity,
            unitPrice: product.price,
            subtotal: product.price * quantity
        };
        order.items.push(newItem);
    }

    // Recalcular total
    order.total = order.items.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
    );

    // Mantener estado abierto
    if (order.status === "PENDING") {
        order.status = "IN_PROGRESS";
    }

    return order;
}
