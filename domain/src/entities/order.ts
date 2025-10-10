import { Entity } from "../utils/types/Entity"
import { OrderStatus } from "../utils/types/OrderStatus"
import { OrderItem } from "./OrderItem"


export interface Order extends Entity {
    tableId: string
    waiterId: string
    cashierId?: string
    status: OrderStatus,
    total: number,
    items: OrderItem[]
}
