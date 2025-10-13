import { Reservation } from "../../entities/Reservation";

interface CancelReservationInput {
    reservation: Reservation;
}

export function cancelReservationUseCase(input: CancelReservationInput): Reservation {
    const { reservation } = input;

    if (!reservation) {
        throw new Error("La reserva es requerida.");
    }

    if (["CANCELLED", "COMPLETED", "EXPIRED"].includes(reservation.status)) {
        throw new Error(`No se puede cancelar una reserva con estado ${reservation.status}.`);
    }

    if (reservation.date <= new Date()) {
        throw new Error("No se puede cancelar una reserva pasada o en curso.");
    }

    reservation.status = "CANCELLED";

    return reservation;
}
