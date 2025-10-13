import { Entity } from "../utils/types/Entity"

export interface Reservation extends Entity {
    tableId: string
    customerName: string
    customerPhone?: string
    customerEmail: string
    date: Date
    people: number
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
}