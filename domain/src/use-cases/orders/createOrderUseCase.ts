import { Order } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { OrderItem } from "../../entities/OrderItem";
import { OrderService } from "../../services/orders/OrderService";
import { OrderWithItems } from "domain/src/utils/types/OrderWithItems";

interface Payload {
    tableId: string;
    waiterId: string;
    status: string;
    items?: { product: Product; quantity: number }[];
}
interface CreateOrderInput {
    dependencies: { orderService: OrderService };
    payload: Payload;
}


export async function createOrderUseCase({
    dependencies,
    payload,
}: CreateOrderInput): Promise<OrderWithItems> {
    const { orderService } = dependencies;

    validateOrderMetadata(payload);

    const order: Order = {
        id: crypto.randomUUID(),
        tableId: payload.tableId,
        waiterId: payload.waiterId,
        status: "OPEN",
        orderDate: new Date(),
    };
    await orderService.save(order);

    const items: OrderItem[] = createOrderItems(payload.items);
    for (const item of items) {
        item.orderId = order.id;
    }

    const orderWithItems: OrderWithItems = { ...order, items };

    return orderWithItems;
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