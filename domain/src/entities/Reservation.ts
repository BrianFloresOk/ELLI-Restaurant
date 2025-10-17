import { Entity } from "../utils/types/Entity"
import { ReservationStatus } from "../utils/types/ReservationStatus"

export interface Reservation extends Entity {
    tableId?: number
    customerName: string
    customerPhone?: string
    customerEmail: string
    date: Date,
    hour: string,
    people: number
    status: ReservationStatus
}