import { Entity } from "../utils/types/Entity"
import { OrderStatus } from "../utils/types/OrderStatus"
import { OrderItem } from "./OrderItem"


export interface Order extends Entity {
    tableId: number
    waiterId: number
    cashierId?: number
    status: OrderStatus,
    orderDate: Date;
    closedDate?: Date;
    orderItems?: OrderItem[];
}