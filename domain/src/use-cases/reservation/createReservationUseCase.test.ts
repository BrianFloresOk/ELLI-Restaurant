import { describe, it, expect} from "vitest"
import { createReservationUseCase } from "./createReservationUseCase";
import { Table } from "../../entities/Table";

describe("createReservationUseCase", () => {
    const mockTable: Table = { id: "1", capacity: 4, status: "AVAILABLE"};
    const mockUser = {
        customerName: "Juan",
        customerEmail: "juan@mail.com",
    }

    it("crea una reserva válida para una fecha futura", () => {
        const futureDate = new Date(Date.now() + 3600 * 1000); // 1h después
        const reservation = createReservationUseCase({
            customerName: mockUser.customerName,
            customerEmail: mockUser.customerEmail,
            date: futureDate,
            peopleCount: 2,
            table: mockTable
        });

        expect(reservation.status).toBe("PENDING");
        expect(reservation.customerName).toEqual(mockUser.customerName);
        expect(reservation.tableId).toEqual(mockTable.id);
        expect(reservation.people).toBe(2);
    });

    it("lanza error si la fecha es pasada", () => {
        const pastDate = new Date(Date.now() - 3600 * 1000);
        expect(() =>
            createReservationUseCase({
                customerName: mockUser.customerName,
                customerEmail: mockUser.customerEmail,
                date: pastDate,
                peopleCount: 2
            })
        ).toThrow("La fecha de la reserva debe ser futura.");
    });

    it("lanza error si la mesa no tiene capacidad suficiente", () => {
        const futureDate = new Date(Date.now() + 3600 * 1000);
        const smallTable: Table = { id: "t2", capacity: 2, status: "AVAILABLE"};

        expect(() =>
            createReservationUseCase({
                customerName: mockUser.customerName,
                customerEmail: mockUser.customerEmail,
                date: futureDate,
                peopleCount: 4,
                table: smallTable
            })
        ).toThrow("La mesa no tiene suficiente capacidad para la cantidad de personas.");
    });
});
