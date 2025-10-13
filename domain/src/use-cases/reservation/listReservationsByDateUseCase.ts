import { Reservation } from "../../entities/Reservation";

interface ListReservationsInput {
    reservations: Reservation[];
    date: Date;
    status?: Reservation["status"];
}

export function listReservationsByDateUseCase(input: ListReservationsInput): Reservation[] {
    const { reservations, date, status } = input;

    if (!Array.isArray(reservations)) {
        throw new Error("La lista de reservas es requerida.");
    }

    if (!date) {
        throw new Error("La fecha es requerida.");
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    let filtered = reservations.filter(
        (r) => r.date >= startOfDay && r.date <= endOfDay
    );

    if (status) {
        filtered = filtered.filter((r) => r.status === status);
    }

    return filtered;
}
