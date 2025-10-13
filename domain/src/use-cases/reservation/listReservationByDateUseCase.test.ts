import { describe, it, expect } from "vitest"
import { listReservationsByDateUseCase } from "./listReservationsByDateUseCase";
import { Reservation } from "../../entities/Reservation";

describe("listReservationsByDateUseCase", () => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 3600 * 1000);

    const reservations: Reservation[] = [
        {
            id: "r1",
            customerName: "juan perez",
            customerEmail: "juan@mail.com",
            tableId: "t1",
            date: new Date(today.setHours(12, 0, 0, 0)),
            hour: "20:30",
            people: 2,
            status: "PENDING",
        },
        {
            id: "r2",
            customerName: "pedro perez",
            customerEmail: "pedro@mail.com",
            tableId: "t2",
            date: new Date(today.setHours(20, 0, 0, 0)),
            hour: "21:00",
            people: 4,
            status: "CONFIRMED",
        },
        {
            id: "r3",
            customerName: "carlos perez",
            customerEmail: "carlos@mail.com",
            tableId: "t3",
            date: tomorrow,
            hour: "21:00",
            people: 3,
            status: "CONFIRMED",
        },
    ];

    it("devuelve las reservas del día indicado", () => {
        const result = listReservationsByDateUseCase({ reservations, date: today });
        expect(result).toHaveLength(2);
        expect(result.map((r) => r.id)).toContain("r1");
        expect(result.map((r) => r.id)).toContain("r2");
    });

    it("filtra por estado correctamente", () => {
        const result = listReservationsByDateUseCase({
            reservations,
            date: today,
            status: "PENDING",
        });
        expect(result).toHaveLength(1);
        expect(result[0].status).toBe("PENDING");
    });

    it("devuelve arreglo vacío si no hay reservas en esa fecha", () => {
        const anotherDay = new Date(today.getTime() + 3 * 24 * 3600 * 1000);
        const result = listReservationsByDateUseCase({
            reservations,
            date: anotherDay,
        });
        expect(result).toHaveLength(0);
    });
});
