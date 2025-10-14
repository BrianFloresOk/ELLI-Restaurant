import { Order } from "../../entities/Order";
import { ReservationService } from "../../services/reservation/ReservationService";
import { OrderService } from "../../services/orders/OrderService";

interface Dependencies {
    reservationService: ReservationService;
    orderService: OrderService;
}

interface ConvertReservationToOrderInput {
    dependencies: Dependencies;
    payload: {
        reservationId: string;
        waiterId?: string;
    };
}

export async function convertReservationToOrderUseCase({
    dependencies,
    payload,
}: ConvertReservationToOrderInput): Promise<Order> {
    const { reservationService, orderService } = dependencies;
    const { reservationId, waiterId } = payload;

    if (!reservationId) {
        throw new Error("El ID de la reserva es requerido.");
    }

    const reservation = await reservationService.findById(reservationId);
    if (!reservation) {
        throw new Error("Reserva no encontrada.");
    }

    if (reservation.status !== "CONFIRMED") {
        throw new Error("Solo las reservas confirmadas pueden convertirse en pedidos.");
    }

    if (!reservation.tableId) {
        throw new Error("La reserva debe tener una mesa asignada.");
    }

    const existingOrder = await orderService.findByTableId(reservation.tableId);
    const hasActiveOrder = existingOrder.status === "OPEN";

    if (hasActiveOrder) {
        throw new Error("La mesa ya tiene un pedido activo.");
    }

    const order: Order = {
        id: crypto.randomUUID(),
        tableId: reservation.tableId,
        waiterId: waiterId ?? "unknown",
        status: "OPEN",
        items: [],
        total: 0,
    };

    // Persistir el nuevo pedido
    await orderService.save(order);

    // Actualizar estado de la reserva
    reservation.status = "CONFIRMED";
    await reservationService.update(reservationId, reservation);

    return order;
}
