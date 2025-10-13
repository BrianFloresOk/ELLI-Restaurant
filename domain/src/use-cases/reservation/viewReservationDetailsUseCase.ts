import { Reservation } from "../../entities/Reservation"

interface ViewReservationDetailsInput {
    reservationId: string
    reservations: Reservation[]
}

export function viewReservationDetailsUseCase(
    input: ViewReservationDetailsInput
): Reservation {
    const { reservationId, reservations } = input

    if (!reservationId) {
        throw new Error("El ID de la reserva es requerido.")
    }

    if (!Array.isArray(reservations) || reservations.length === 0) {
        throw new Error("No hay reservas disponibles para consultar.")
    }

    const reservation = reservations.find(r => r.id === reservationId)

    if (!reservation) {
        throw new Error("Reserva no encontrada.")
    }

    return reservation
}
