import { Entity } from "../utils/types/Entity"
import { OrderStatus } from "../utils/types/OrderStatus"


export interface Order extends Entity {
    tableId: number
    waiterId: number
    cashierId?: number
    status: OrderStatus,
    total?: number,
    orderDate: Date;
    closedDate?: Date;
}