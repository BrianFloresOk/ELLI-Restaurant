import { describe, it, expect, beforeEach, vi } from "vitest";
import { assignTableToReservationUseCase } from "./assignTableToReservationUseCase";
import { Reservation } from "../../entities/Reservation";
import { Table } from "../../entities/Table";
import { ReservationService } from "../../services/reservation/ReservationService";
import { TableService } from "../../services/table/TableService";

// Mocks para las dependencias
const mockReservationService: ReservationService = {
    findAll: vi.fn(),
    findById: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    listByDate: vi.fn(),
    assignTable: vi.fn(),
    findByDateRange: vi.fn(),
};

const mockTableService: TableService = {
    findById: vi.fn(),
    update: vi.fn(),
};

const dependencies = {
    reservationService: mockReservationService,
    tableService: mockTableService,
};

describe("assignTableToReservationUseCase", () => {
    let reservation: Reservation;
    let table: Table;
    const mockUser = {
        customerName: "Juan",
        customerEmail: "juan@mail.com",
    };

    beforeEach(() => {
        reservation = {
            id: 1,
            customerName: mockUser.customerName,
            customerEmail: mockUser.customerEmail,
            people: 2,
            date: new Date(Date.now() + 2 * 3600 * 1000),
            hour: "20:00",
            status: "PENDING",
            tableId: undefined,
        };

        table = {
            id: 1,
            capacity: 4,
            status: "AVAILABLE",
        };

        vi.clearAllMocks();
    });

    it("asigna correctamente una mesa disponible a una reserva pendiente", async () => {
        vi.mocked(mockReservationService.findById).mockResolvedValue(reservation);
        vi.mocked(mockTableService.findById).mockResolvedValue(table);
        vi.mocked(mockReservationService.update).mockResolvedValue();
        vi.mocked(mockTableService.update).mockResolvedValue();

        const result = await assignTableToReservationUseCase({
            dependencies,
            payload: { reservationId: 1, tableId: 1 },
        });

        expect(result.tableId).toBe(1);
        expect(result.status).toBe("CONFIRMED");

        expect(mockReservationService.update).toHaveBeenCalledWith(
            "r1",
            expect.objectContaining({
                tableId: "t1",
                status: "CONFIRMED"
            })
        );

        expect(mockTableService.update).toHaveBeenCalledWith(
            "t1",
            expect.objectContaining({
                status: "OCCUPIED"
            })
        );
    });

    it("lanza error si la reserva ya tiene mesa asignada", async () => {
        reservation.tableId = 9;
        vi.mocked(mockReservationService.findById).mockResolvedValue(reservation);
        vi.mocked(mockTableService.findById).mockResolvedValue(table);

        await expect(
            assignTableToReservationUseCase({
                dependencies,
                payload: { reservationId: 1, tableId: 1 }
            })
        ).rejects.toThrow("La reserva ya tiene una mesa asignada.");
    });

    it("lanza error si la mesa no está disponible", async () => {
        table.status = "OCCUPIED";
        vi.mocked(mockReservationService.findById).mockResolvedValue(reservation);
        vi.mocked(mockTableService.findById).mockResolvedValue(table);

        await expect(
            assignTableToReservationUseCase({
                dependencies,
                payload: { reservationId: 1, tableId: 1 }
            })
        ).rejects.toThrow("La mesa no está disponible.");
    });

    it("lanza error si la reserva está cancelada", async () => {
        reservation.status = "CANCELLED";
        vi.mocked(mockReservationService.findById).mockResolvedValue(reservation);
        vi.mocked(mockTableService.findById).mockResolvedValue(table);

        await expect(
            assignTableToReservationUseCase({
                dependencies,
                payload: { reservationId: 1, tableId: 1 }
            })
        ).rejects.toThrow("No se puede asignar una mesa a una reserva cancelada o completada.");
    });

    it("lanza error si la reserva está completada", async () => {
        reservation.status = "COMPLETED";
        vi.mocked(mockReservationService.findById).mockResolvedValue(reservation);
        vi.mocked(mockTableService.findById).mockResolvedValue(table);

        await expect(
            assignTableToReservationUseCase({
                dependencies,
                payload: { reservationId: 1, tableId: 1 }
            })
        ).rejects.toThrow("No se puede asignar una mesa a una reserva cancelada o completada.");
    });

    it("lanza error si no se proporciona reservationId", async () => {
        await expect(
            assignTableToReservationUseCase({
                dependencies,
                payload: { reservationId: 0, tableId: 1 }
            })
        ).rejects.toThrow("La reserva es requerida.");
    });

    it("lanza error si no se proporciona tableId", async () => {
        await expect(
            assignTableToReservationUseCase({
                dependencies,
                payload: { reservationId: 1, tableId: 0 }
            })
        ).rejects.toThrow("La mesa es requerida.");
    });

    it("lanza error si la reserva no existe", async () => {
        vi.mocked(mockReservationService.findById).mockResolvedValue(null);
        vi.mocked(mockTableService.findById).mockResolvedValue(table);

        await expect(
            assignTableToReservationUseCase({
                dependencies,
                payload: { reservationId: 1, tableId: 1 }
            })
        ).rejects.toThrow("Reserva no encontrada.");
    });

    it("lanza error si la mesa no existe", async () => {
        vi.mocked(mockReservationService.findById).mockResolvedValue(reservation);
        vi.mocked(mockTableService.findById).mockResolvedValue(null);

        await expect(
            assignTableToReservationUseCase({
                dependencies,
                payload: { reservationId: 1, tableId: 1 }
            })
        ).rejects.toThrow("Mesa no encontrada.");
    });

    it("actualiza correctamente tanto la reserva como la mesa", async () => {
        vi.mocked(mockReservationService.findById).mockResolvedValue(reservation);
        vi.mocked(mockTableService.findById).mockResolvedValue(table);
        vi.mocked(mockReservationService.update).mockResolvedValue();
        vi.mocked(mockTableService.update).mockResolvedValue();

        await assignTableToReservationUseCase({
            dependencies,
            payload: { reservationId: 1, tableId: 1 },
        });

        expect(mockReservationService.update).toHaveBeenCalledTimes(1);
        expect(mockTableService.update).toHaveBeenCalledTimes(1);
        expect(mockReservationService.update).toHaveBeenCalledWith(1, {
            ...reservation,
            tableId: 1,
            status: "CONFIRMED"
        });

        expect(mockTableService.update).toHaveBeenCalledWith(1, {
            ...table,
            status: "OCCUPIED"
        });
    });
});