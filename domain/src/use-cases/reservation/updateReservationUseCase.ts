import { Reservation } from "../../entities/Reservation";
import { ReservationService } from "../../services/reservation/ReservationService";
import { TableService } from "../../services/table/TableService";

interface Dependencies {
    reservationService: ReservationService;
    tableService: TableService;
}

interface UpdateReservationInput {
    dependencies: Dependencies;
    payload: {
        reservationId: string;
        newDate?: Date;
        newPeopleCount?: number;
        newTableId?: string;
    };
}

export async function updateReservationUseCase({
    dependencies,
    payload,
}: UpdateReservationInput): Promise<Reservation> {
    const { reservationService, tableService } = dependencies;
    const { reservationId, newDate, newPeopleCount, newTableId } = payload;

    if (!reservationId) throw new Error("La reserva es requerida.");

    const reservation = await reservationService.findById(reservationId);
    if (!reservation) throw new Error("Reserva no encontrada.");

    checkStatusReservation(reservation);

    validateDate(newDate, reservation);

    validatePeopleForTable(newPeopleCount, reservation);

    await assingNewTable(newTableId, tableService, newPeopleCount, reservation);

    await reservationService.update(reservationId, reservation);

    return reservation;
}

async function assingNewTable(newTableId: string | undefined, tableService: TableService, newPeopleCount: number | undefined, reservation: Reservation) {
    if (newTableId) {
        const table = await tableService.findById(newTableId);
        if (!table) throw new Error("Mesa no encontrada.");

        const capacity = newPeopleCount ?? reservation.people;
        if (table.capacity < capacity) {
            throw new Error("La mesa no tiene suficiente capacidad para la cantidad de personas.");
        }

        reservation.tableId = table.id;
    }
}

function validatePeopleForTable(newPeopleCount: number | undefined, reservation: Reservation) {
    if (newPeopleCount !== undefined) {
        if (newPeopleCount <= 0) throw new Error("La cantidad de personas debe ser mayor a cero.");
        reservation.people = newPeopleCount;
    }
}

function checkStatusReservation(reservation: Reservation) {
    if (["CANCELLED", "COMPLETED", "EXPIRED"].includes(reservation.status)) {
        throw new Error(`No se puede modificar una reserva con estado ${reservation.status}.`);
    }
}

function validateDate(newDate: Date | undefined, reservation: Reservation) {
    if (newDate) {
        if (!(newDate instanceof Date) || isNaN(newDate.getTime())) {
            throw new Error("La fecha de la reserva no es válida.");
        }
        if (newDate <= new Date()) {
            throw new Error("La fecha de la reserva debe ser futura.");
        }
        reservation.date = newDate;
    }
}
