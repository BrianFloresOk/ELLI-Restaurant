import { Reservation } from "../../entities/Reservation";
import { ReservationService } from "../../services/reservation/ReservationService";

interface Dependencies {
    reservationService: ReservationService;
}

interface ListReservationsByDateInput {
    dependencies: Dependencies;
    date: Date;
    status?: Reservation["status"];
}

export async function listReservationsByDateUseCase({
    dependencies,
    date,
    status,
}: ListReservationsByDateInput): Promise<Reservation[]> {
    const { reservationService } = dependencies;

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error("La fecha proporcionada no es válida.");
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const reservations = await reservationService.findByDateRange(startOfDay, endOfDay);

    if (!reservations || reservations.length === 0) {
        throw new Error("No hay reservas disponibles para la fecha indicada.");
    }

    return status
        ? reservations.filter((r) => r.status === status)
        : reservations;
}
