import { Entity } from "../utils/types/Entity"
import { OrderStatus } from "../utils/types/OrderStatus"


export interface Order extends Entity {
    tableId: string
    waiterId: string
    cashierId?: string
    status: OrderStatus
}
