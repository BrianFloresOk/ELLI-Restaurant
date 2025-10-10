import { Entity } from "../utils/types/Entity"
import { OrderStatus } from "../utils/types/orderStatus"


export interface Order extends Entity {
    tableId: string
    waiterId: string
    cashierId?: string
    status: OrderStatus
}
