import { Reservation } from "../../entities/Reservation";
import { Table } from "../../entities/Table";

interface AssignTableInput {
    reservation: Reservation;
    table: Table;
}

export function assignTableToReservationUseCase(input: AssignTableInput): Reservation {
    const { reservation, table } = input;

    if (!reservation) {
        throw new Error("La reserva es requerida.");
    }

    if (!table) {
        throw new Error("La mesa es requerida.");
    }

    if (reservation.status === "CANCELLED" || reservation.status === "COMPLETED") {
        throw new Error("No se puede asignar una mesa a una reserva cancelada o completada.");
    }

    if (reservation.tableId) {
        throw new Error("La reserva ya tiene una mesa asignada.");
    }

    if (table.status !== "AVAILABLE") {
        throw new Error("La mesa no está disponible.");
    }

    // Asignar mesa y actualizar estados
    const updatedReservation: Reservation = {
        ...reservation,
        tableId: table.id,
        status: "CONFIRMED",
    };

    table.status = "OCCUPIED";

    return updatedReservation;
}
