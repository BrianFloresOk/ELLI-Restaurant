// usecases/reservations/createReservationUseCase.ts
import { Reservation } from "../../entities/Reservation";
import { Table } from "../../entities/Table";

interface CreateReservationInput {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    date: Date;
    peopleCount: number;
    table?: Table;
}

export function createReservationUseCase(input: CreateReservationInput): Reservation {
    const { customerName, date, peopleCount, table } = input;

    if (!customerName) {
        throw new Error("El cliente es requerido.");
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error("La fecha de la reserva no es válida.");
    }

    const now = new Date();
    if (date <= now) {
        throw new Error("La fecha de la reserva debe ser futura.");
    }

    if (peopleCount <= 0) {
        throw new Error("La cantidad de personas debe ser mayor a cero.");
    }

    // Si hay una mesa, validar que tenga capacidad suficiente
    if (table && table.capacity < peopleCount) {
        throw new Error("La mesa no tiene suficiente capacidad para la cantidad de personas.");
    }

    // Crear la reserva
    const reservation: Reservation = {
        id: crypto.randomUUID(),
        customerName,
        customerEmail: input.customerEmail,
        hour: date.toISOString().split("T")[1].substring(0,5),
        tableId : "1",
        people: 2,
        date,
        status: "PENDING",
    };

    return reservation;
}
