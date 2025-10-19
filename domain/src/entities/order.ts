import { Entity } from "../utils/types/Entity"
import { OrderStatus } from "../utils/types/OrderStatus"
import { OrderItem } from "./OrderItem"
import { Payment } from "./Payment"
import { Table } from "./Table"


export interface Order extends Entity {
    tableId: number
    waiterId: number
    cashierId?: number
    status: OrderStatus,
    total?: number,
    orderDate: Date;
    closedDate?: Date;
    table?: Table;
    orderItems?: OrderItem[];
    payment?: Payment;
}