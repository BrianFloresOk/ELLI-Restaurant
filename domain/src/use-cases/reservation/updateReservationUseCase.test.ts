import { describe, it, expect, beforeEach } from "vitest"
import { updateReservationUseCase } from "./updateReservationUseCase";
import { Reservation } from "../../entities/Reservation";
import { Table } from "../../entities/Table";

describe("updateReservationUseCase", () => {
    const mockUser = {
        id: "u1",
        customerName: "Juan Pérez",
        customerEmail: "juan@mail.com",

    };
    const originalTable: Table = { id: "t1", capacity: 4, status: "AVAILABLE" };

    let reservation: Reservation;

    beforeEach(() => {
        reservation = {
            id: "r1",
            customerName: mockUser.customerName,
            customerEmail: mockUser.customerEmail,
            tableId: originalTable.id,
            hour: "19:00",
            people: 2,
            date: new Date(Date.now() + 3600 * 1000),
            status: "PENDING",
        };
    });

    it("permite actualizar fecha y cantidad de personas", () => {
        const newDate = new Date(Date.now() + 7200 * 1000);
        const updated = updateReservationUseCase({
            reservation,
            newDate,
            newPeopleCount: 3
        });

        expect(updated.date).toEqual(newDate);
        expect(updated.people).toBe(3);
    });

    it("permite cambiar mesa si tiene capacidad suficiente", () => {
        const newTable: Table = { id: "t2", capacity: 4, status: "AVAILABLE" };
        const updated = updateReservationUseCase({
            reservation,
            newTable
        });

        expect(updated.tableId).toEqual(newTable.id);
    });

    it("lanza error si la mesa no tiene capacidad suficiente", () => {
        const smallTable: Table = { id: "t2", capacity: 2, status: "AVAILABLE" };

        expect(() =>
            updateReservationUseCase({
                reservation,
                newTable: smallTable,
                newPeopleCount: 3
            })
        ).toThrow("La mesa no tiene suficiente capacidad para la cantidad de personas.");
    });

    it("lanza error si la fecha es pasada", () => {
        const pastDate = new Date(Date.now() - 3600 * 1000);

        expect(() =>
            updateReservationUseCase({
                reservation,
                newDate: pastDate
            })
        ).toThrow("La fecha de la reserva debe ser futura.");
    });

    it("lanza error si la reserva está CANCELLED", () => {
        reservation.status = "CANCELLED";

        expect(() =>
            updateReservationUseCase({ reservation, newPeopleCount: 2 })
        ).toThrow("No se puede modificar una reserva con estado CANCELLED.");
    });
});
