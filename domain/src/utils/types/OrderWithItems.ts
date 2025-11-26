import { Order } from "../../entities/order"
import { OrderItem } from "../../entities/orderItem"

export interface OrderWithItems extends Order {
    items: Omit<OrderItem, "id">[];
}