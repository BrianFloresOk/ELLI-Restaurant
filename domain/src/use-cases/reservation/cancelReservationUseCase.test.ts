import { describe, it, expect, beforeEach } from "vitest"
import { cancelReservationUseCase } from "./cancelReservationUseCase";
import { Reservation } from "../../entities/Reservation";
import { Table } from "../../entities/Table";

describe("cancelReservationUseCase", () => {
    const mockUser = {
        customerName: "Juan",
        customerEmail: "juan@mail.com",
    }
    const table: Table = { id: "t1", capacity: 4, status: "AVAILABLE" };

    let reservation: Reservation;

    beforeEach(() => {
        reservation = {
            id: "r1",
            customerName: mockUser.customerName,
            customerEmail: mockUser.customerEmail,
            tableId: table.id,
            people: 2,
            date: new Date(Date.now() + 2 * 3600 * 1000),
            hour: "20:00",
            status: "CONFIRMED",
        };
    });

    it("cancela correctamente una reserva confirmada", () => {
        const result = cancelReservationUseCase({ reservation });

        expect(result.status).toBe("CANCELLED");
    });

    it("lanza error si la reserva ya está cancelada", () => {
        reservation.status = "CANCELLED";
        expect(() =>
            cancelReservationUseCase({ reservation })
        ).toThrow("No se puede cancelar una reserva con estado CANCELLED.");
    });

    it("lanza error si la reserva está en el pasado", () => {
        reservation.date = new Date(Date.now() - 3600 * 1000);
        expect(() =>
            cancelReservationUseCase({ reservation })
        ).toThrow("No se puede cancelar una reserva pasada o en curso.");
    });
});
