import { Reservation } from "../../entities/Reservation"

export interface ReservationService {
    findAll(): Promise<Reservation[]>
    findById(id: number): Promise<Reservation | null>
    save(reservation: Reservation): Promise<void>
    update(reservationId: number, data: Partial<Reservation>): Promise<void>
    listByDate(date: Date): Promise<Reservation[]>
    assignTable(reservationId: number, tableId: number): Promise<void>
    findByDateRange(startDate: Date, endDate: Date): Promise<Reservation[]>
}
