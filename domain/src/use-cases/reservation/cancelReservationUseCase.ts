import { Reservation } from "../../entities/Reservation";
import { ReservationService } from "../../services/reservation/ReservationService";

interface Dependencies {
    reservationService: ReservationService;
}

interface CancelReservationInput {
    dependencies: Dependencies;
    payload: {
        reservationId: string;
    };
}

export async function cancelReservationUseCase({
    dependencies,
    payload,
}: CancelReservationInput): Promise<Reservation> {
    const { reservationService } = dependencies;
    const { reservationId } = payload;

    if (!reservationId) {
        throw new Error("El ID de la reserva es requerido.");
    }

    const reservation = await reservationService.findById(reservationId);
    if (!reservation) {
        throw new Error("Reserva no encontrada.");
    }

    if (["CANCELLED", "COMPLETED", "EXPIRED"].includes(reservation.status)) {
        throw new Error(
            `No se puede cancelar una reserva con estado ${reservation.status}.`
        );
    }

    if (reservation.date <= new Date()) {
        throw new Error("No se puede cancelar una reserva pasada o en curso.");
    }

    reservation.status = "CANCELLED";

    await reservationService.update(reservationId, reservation);

    return reservation;
}
