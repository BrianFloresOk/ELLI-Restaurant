import { Order } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { OrderItem } from "../../entities/OrderItem";

interface CreateOrderInput {
    tableId: string;
    waiterId: string;
    items?: { product: Product; quantity: number }[];
}

function validateOrderMetadata(input: CreateOrderInput): void {
    if (!input.tableId) {
        throw new Error("Table ID is required");
    }
    if (!input.waiterId) {
        throw new Error("Waiter ID is required");
    }
}

function createOrderItems(inputItems?: { product: Product; quantity: number }[]): OrderItem[] {
    return (
        inputItems?.map(({ product, quantity }) => {
            const unitPrice = product.price;
            const subtotal = unitPrice * quantity;
            return {
                id: crypto.randomUUID(),
                orderId: "",
                productId: product.id,
                quantity,
                unitPrice,
                subtotal,
            } as OrderItem;
        }) || []
    );
}

function calculateOrderTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.subtotal, 0);
}

function createOrder(input: CreateOrderInput, total: number, items: OrderItem[]): Order {
    return {
        id: crypto.randomUUID(),
        tableId: input.tableId,
        waiterId: input.waiterId,
        status: "PENDING",
        items: items,
        total
    };
}

export function createOrderUseCase(input: CreateOrderInput): Order {
    validateOrderMetadata(input);
    const items = createOrderItems(input.items);
    const total = calculateOrderTotal(items);
    const order: Order = createOrder(input, total, items);
    return order;
}