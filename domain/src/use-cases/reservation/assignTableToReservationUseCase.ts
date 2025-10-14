import { Reservation } from "../../entities/Reservation";
import { Table } from "../../entities/Table";
import { ReservationService } from "../../services/reservation/ReservationService";
import { TableService } from "../../services/table/TableService";

interface Dependencies {
    reservationService: ReservationService;
    tableService: TableService;
}

interface AssignTableInput {
    dependencies: Dependencies;
    payload: {
        reservationId: string;
        tableId: string;
    };
}

export async function assignTableToReservationUseCase({
    dependencies,
    payload,
}: AssignTableInput): Promise<Reservation> {
    const { reservationService, tableService } = dependencies;
    const { reservationId, tableId } = payload;

    if (!reservationId) throw new Error("La reserva es requerida.");
    if (!tableId) throw new Error("La mesa es requerida.");

    const reservation = await reservationService.findById(reservationId);
    if (!reservation) throw new Error("Reserva no encontrada.");

    const table = await tableService.findById(tableId);
    if (!table) throw new Error("Mesa no encontrada.");

    if (["CANCELLED", "COMPLETED"].includes(reservation.status)) {
        throw new Error(
            "No se puede asignar una mesa a una reserva cancelada o completada."
        );
    }

    if (reservation.tableId) {
        throw new Error("La reserva ya tiene una mesa asignada.");
    }

    if (table.status !== "AVAILABLE") {
        throw new Error("La mesa no está disponible.");
    }

    reservation.tableId = table.id;
    reservation.status = "CONFIRMED";
    table.status = "OCCUPIED";

    await reservationService.update(reservationId, reservation);
    await tableService.update(tableId, table);

    return reservation;
}
