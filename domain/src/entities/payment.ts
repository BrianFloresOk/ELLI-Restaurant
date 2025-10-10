import { Entity } from "../utils/types/Entity"
import { PaymentMethod } from "../utils/types/PaymentMethod"

export interface Payment extends Entity {
    orderId: string
    method: PaymentMethod
    amount: number
    paidAt: Date
}
