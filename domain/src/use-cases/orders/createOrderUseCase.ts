import { Order } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { OrderItem } from "../../entities/OrderItem";
import { OrderService } from "../../services/orders/OrderService";

interface Payload {
    tableId: string;
    waiterId: string;
    items?: { product: Product; quantity: number }[];
}

interface CreateOrderInput {
    dependencies: { orderService: OrderService };
    payload: Payload;
}

export async function createOrderUseCase({
    dependencies,
    payload,
}: CreateOrderInput): Promise<Order> {
    const { orderService } = dependencies;

    validateOrderMetadata(payload);
    const items = createOrderItems(payload.items);
    const total = calculateOrderTotal(items);

    const order: Order = {
        id: crypto.randomUUID(),
        tableId: payload.tableId,
        waiterId: payload.waiterId,
        status: "OPEN",
        items,
        total,
    };
    await orderService.save(order);

    return order;
}

function validateOrderMetadata(payload: Payload): void {
    if (!payload.tableId) {
        throw new Error("Table ID is required");
    }
    if (!payload.waiterId) {
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
                status: "PENDING",
            } as OrderItem;
        }) || []
    );
}

function calculateOrderTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.subtotal, 0);
}