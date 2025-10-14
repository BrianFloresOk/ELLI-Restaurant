import { Reservation } from "../../entities/Reservation"

export interface ReservationService {
    findAll(): Promise<Reservation[]>
    findById(id: string): Promise<Reservation | null>
    save(reservation: Reservation): Promise<void>
    update(reservationId: string, data: Partial<Reservation>): Promise<void>
    listByDate(date: Date): Promise<Reservation[]>
    assignTable(reservationId: string, tableId: string): Promise<void>
    findByDateRange(startDate: Date, endDate: Date): Promise<Reservation[]>
}
