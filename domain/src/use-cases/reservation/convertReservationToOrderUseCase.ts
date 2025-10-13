import { Reservation } from "../../entities/Reservation"
import { Order } from "../../entities/Order"

interface ConvertReservationToOrderInput {
    reservation: Reservation
    existingOrders: Order[]
    waiterId?: string
}

export function convertReservationToOrderUseCase(input: ConvertReservationToOrderInput): Order {
    const { reservation, existingOrders, waiterId } = input

    if (!reservation) {
        throw new Error("La reserva es requerida.")
    }

    if (reservation.status !== "CONFIRMED") {
        throw new Error("Solo las reservas confirmadas pueden convertirse en pedidos.")
    }

    if (!reservation.tableId) {
        throw new Error("La reserva debe tener una mesa asignada.")
    }

    const hasActiveOrder = existingOrders.some(
        (order) =>
            order.tableId === reservation.tableId &&
            ["OPEN"].includes(order.status)
    )

    if (hasActiveOrder) {
        throw new Error("La mesa ya tiene un pedido activo.")
    }

    // Crear la nueva orden
    const order: Order = {
        id: crypto.randomUUID(),
        tableId: reservation.tableId,
        waiterId: waiterId?? "unknown",
        status: "OPEN",
        items: [],
        total: 0
    }

    reservation.status = "CONFIRMED"

    return order
}
