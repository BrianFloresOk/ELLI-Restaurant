import { Order } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { OrderItem } from "../../entities/OrderItem";
import { OrderService } from "../../services/orders/OrderService";
import { OrderWithItems } from "../../utils/types/OrderWithItems";

interface Payload {
    tableId: number;
    waiterId: number;
    items?: { product: Product; quantity: number, notes?: string }[];
}
interface CreateOrderInput {
    dependencies: { orderService: OrderService };
    payload: Payload;
}

type OrderCreateData = Omit<Order, "id">;

export async function createOrderUseCase({
    dependencies,
    payload,
}: CreateOrderInput): Promise<OrderWithItems> {
    const { orderService } = dependencies;

    validateOrderMetadata(payload);

    const order: OrderCreateData = {
        tableId: payload.tableId,
        waiterId: payload.waiterId,
        status: "OPEN",
        orderDate: new Date(),
    };

    const orderCreated = await orderService.save(order);

    const items = createOrderItems(orderCreated?.id, payload.items);
    for (const item of items) {
        item.orderId = orderCreated?.id;
    }

    const orderWithItems: OrderWithItems = { ...orderCreated, items };

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

function createOrderItems(orderId: number, inputItems?: { product: Product; quantity: number, notes?: string }[]): Omit<OrderItem, "id">[] {
    return (
        inputItems?.map(({ product, quantity, notes }) => {
            const unitPrice = product.price;
            const subtotal = unitPrice * quantity;
            return {
                notes: notes ?? "",
                orderId: orderId,
                productId: product.id,
                quantity,
                unitPrice,
                subtotal,
                status: "PENDING",
            } as unknown as Omit<OrderItem, "id">;
        }) || []
    );
}