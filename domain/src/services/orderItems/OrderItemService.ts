import { OrderItem } from "../../entities/OrderItem";
import { Product } from "../../entities/Product";

export interface OrderItemService {
    findById(id: string): Promise<OrderItem | null>
    save(item: OrderItem): Promise<void>
    addProduct(item: Product, quantity: number): Promise<OrderItem>
}