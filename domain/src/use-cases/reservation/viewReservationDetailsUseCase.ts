import { Reservation } from "../../entities/Reservation";
import { ReservationService } from "../../services/reservation/ReservationService";

interface Dependencies {
    reservationService: ReservationService;
}

interface ViewReservationDetailsInput {
    dependencies: Dependencies;
    reservationId: string;
}

export async function viewReservationDetailsUseCase({
    dependencies,
    reservationId,
}: ViewReservationDetailsInput): Promise<Reservation> {
    const { reservationService } = dependencies;

    if (!reservationId) {
        throw new Error("El ID de la reserva es requerido.");
    }

    const reservation = await reservationService.findById(reservationId);

    if (!reservation) {
        throw new Error("Reserva no encontrada.");
    }

    return reservation;
}
