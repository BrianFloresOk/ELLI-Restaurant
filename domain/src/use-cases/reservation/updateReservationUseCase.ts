import { Reservation } from "../../entities/Reservation";
import { Table } from "../../entities/Table";

interface UpdateReservationInput {
    reservation: Reservation;
    newDate?: Date;
    newPeopleCount?: number;
    newTable?: Table;
}

export function updateReservationUseCase(input: UpdateReservationInput): Reservation {
    const { reservation, newDate, newPeopleCount, newTable } = input;

    if (!reservation) {
        throw new Error("La reserva es requerida.");
    }

    if (["CANCELLED", "COMPLETED", "EXPIRED"].includes(reservation.status)) {
        throw new Error(`No se puede modificar una reserva con estado ${reservation.status}.`);
    }

    // Validaciones de fecha
    if (newDate) {
        if (!(newDate instanceof Date) || isNaN(newDate.getTime())) {
            throw new Error("La fecha de la reserva no es válida.");
        }
        if (newDate <= new Date()) {
            throw new Error("La fecha de la reserva debe ser futura.");
        }
        reservation.date = newDate;
    }

    // Validación de cantidad de personas
    if (newPeopleCount !== undefined) {
        if (newPeopleCount <= 0) {
            throw new Error("La cantidad de personas debe ser mayor a cero.");
        }
        reservation.people = newPeopleCount;
    }

    // Validación de mesa
    if (newTable) {
        if (newTable.capacity < (newPeopleCount ?? reservation.people)) {
            throw new Error("La mesa no tiene suficiente capacidad para la cantidad de personas.");
        }
        reservation.tableId = newTable.id;
    }

    return reservation;
}

