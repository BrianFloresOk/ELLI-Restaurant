import { describe, it, expect, beforeEach } from "vitest"
import { assignTableToReservationUseCase } from "./assignTableToReservationUseCase";
import { Reservation } from "../../entities/Reservation";
import { Table } from "../../entities/Table";

describe("assignTableToReservationUseCase", () => {
    let reservation: Reservation;
    let table: Table;
    const mockUser = {
        customerName: "Juan",
        customerEmail: "juan@mail.com",
    }

    beforeEach(() => {
        reservation = {
            id: "r1",
            customerName: mockUser.customerName,
            customerEmail: mockUser.customerEmail,
            people: 2,
            date: new Date(Date.now() + 2 * 3600 * 1000),
            hour: "20:00",
            status: "PENDING",
        };

        table = {
            id: "t1",
            capacity: 4,
            status: "AVAILABLE",
        };
    });

    it("asigna correctamente una mesa disponible a una reserva pendiente", () => {
        const updated = assignTableToReservationUseCase({ reservation, table });
        expect(updated.tableId).toBe("t1");
        expect(updated.status).toBe("CONFIRMED");
        expect(table.status).toBe("OCCUPIED");
    });

    it("lanza error si la reserva ya tiene mesa asignada", () => {
        reservation.tableId = "t9";
        expect(() =>
            assignTableToReservationUseCase({ reservation, table })
        ).toThrow("La reserva ya tiene una mesa asignada.");
    });

    it("lanza error si la mesa no está disponible", () => {
        table.status = "OCCUPIED";
        expect(() =>
            assignTableToReservationUseCase({ reservation, table })
        ).toThrow("La mesa no está disponible.");
    });

    it("lanza error si la reserva está cancelada", () => {
        reservation.status = "CANCELLED";
        expect(() =>
            assignTableToReservationUseCase({ reservation, table })
        ).toThrow("No se puede asignar una mesa a una reserva cancelada o completada.");
    });
});
