import { OrderItem } from "domain/src/entities";
import { Order } from "../../entities/Order";


interface UpdateOrderPayload {
    orderId: string;
    itemId: string;
    data: Omit<OrderItem, "id" | "orderId" | "productId">;
}



export interface OrderService {
    findById(id: string): Promise<Order | null>;
    list(): Promise<Order[]>;
    save(order: Omit<Order, "id">): Promise<Order>;
    update(id: string, data: Order): Promise<void>;
    delete(id: string): Promise<void>;
    closeOrder(orderId: string): Promise<Order>;
    findByStatus(status: string): Promise<Order[]>;
    findByTableId(tableId: string): Promise<Order[] | null>;

    addItem(orderId: string, item: OrderItem): Promise<void>;
    updateItem(payload: UpdateOrderPayload): Promise<void>;
    removeItem(orderId: string, itemId: string): Promise<void>;
    listItems(orderId: string): Promise<OrderItem[]>;
}