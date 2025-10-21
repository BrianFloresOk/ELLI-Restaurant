import { Order, OrderItem } from "domain/src/entities";

export interface OrderWithItems extends Order {
    items: Omit<OrderItem, "id">[];
}