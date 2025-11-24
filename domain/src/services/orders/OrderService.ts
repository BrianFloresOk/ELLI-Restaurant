import { OrderItem } from "../../entities/orderItem"
import { Order } from "../../entities/order";

interface UpdateOrderItemQuantityPayload {
    orderId: number;
    itemId: number;
    quantity: number;
}

export interface OrderService {
    findById(id: number): Promise<Order | null>;
    list(): Promise<Order[]>;
    save(order: Omit<Order, "id">): Promise<Order>;
    update(id: number, data: Order): Promise<void>;
    delete(id: number): Promise<void>;
    closeOrder(orderId: number): Promise<Order>;
    findByStatus(status: string): Promise<Order[]>;
    findByTableId(tableId: number): Promise<Order | null>;
    addItem(orderId: number, item: Omit<OrderItem, "id" | "orderId">): Promise<void>;
    updateItemQuantity(payload: UpdateOrderItemQuantityPayload): Promise<void>;
    removeItem(orderId: number, itemId: number): Promise<void>;
    listItems(orderId: number): Promise<any>;
    findItemByProduct(orderId: number, productId: number): Promise<OrderItem | null>;
    updateItemStatusByOrder(orderId: number, fromStatus: string, toStatus: string): Promise<void>;
}