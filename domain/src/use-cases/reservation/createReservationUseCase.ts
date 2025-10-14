// domain/src/use-cases/reservations/createReservationUseCase.ts
import { Reservation } from "../../entities/Reservation";
import { Table } from "../../entities/Table";
import { ReservationService } from "../../services/reservation/ReservationService";

interface CreateReservationPayload {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    date: Date;
    peopleCount: number;
    table?: Table;
}

interface CreateReservationInput {
    dependencies: { reservationService: ReservationService };
    payload: CreateReservationPayload;
}

export async function createReservationUseCase({
    dependencies,
    payload
}: CreateReservationInput): Promise<Reservation> {
    const { reservationService } = dependencies;
    const { customerName, customerEmail, customerPhone, date, peopleCount, table } = payload;

    if (!customerName) throw new Error("El cliente es requerido.");
    if (!(date instanceof Date) || isNaN(date.getTime())) throw new Error("La fecha de la reserva no es válida.");
    if (date <= new Date()) throw new Error("La fecha de la reserva debe ser futura.");
    if (peopleCount <= 0) throw new Error("La cantidad de personas debe ser mayor a cero.");
    if (table && table.capacity < peopleCount) throw new Error("La mesa no tiene suficiente capacidad para la cantidad de personas.");

    const reservation: Reservation = {
        id: crypto.randomUUID(),
        customerName,
        customerEmail,
        customerPhone,
        tableId: table?.id ?? "",  // si hay mesa asignada
        people: peopleCount,
        date,
        hour: date.toISOString().split("T")[1].substring(0, 5),
        status: "PENDING",
    };

    await reservationService.save(reservation);

    return reservation;
}
