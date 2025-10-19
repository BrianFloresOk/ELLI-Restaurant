import { OrderItem } from "domain/src/entities";
import { Order } from "../../entities/Order";


interface UpdateOrderPayload {
    orderId: number;
    itemId: number;
    data: Omit<OrderItem, "id" | "orderId" | "productId">;
}

export interface OrderService {
    findById(id: number): Promise<Order | null>;
    list(): Promise<Order[]>;
    save(order: Omit<Order, "id">): Promise<Order>;
    update(id: number, data: Order): Promise<void>;
    delete(id: number): Promise<void>;
    closeOrder(orderId: number): Promise<Order>;
    findByStatus(status: string): Promise<Order[]>;
    findByTableId(tableId: number): Promise<Order[] | null>;

    addItem(orderId: number, item: Omit<OrderItem, "id">): Promise<void>;
    updateItem(payload: UpdateOrderPayload): Promise<void>;
    removeItem(orderId: number, itemId: number): Promise<void>;
    listItems(orderId: number): Promise<OrderItem[]>;
}