// domain/src/use-cases/reservations/__tests__/createReservationUseCase.spec.ts
import { describe, it, expect, vi } from "vitest";
import { createReservationUseCase } from "./createReservationUseCase";
import { ReservationService } from "../../services/reservation/ReservationService";

describe("createReservationUseCase", () => {
    const mockReservationService: ReservationService = {
        save: vi.fn(async (reservation) => {
            return Promise.resolve();
        }),
        findById: vi.fn(),
        findAll: vi.fn(),
        update: vi.fn(),
        listByDate: vi.fn(),
        assignTable: vi.fn(),
        findByDateRange: vi.fn()
    };

    it("crea una reserva correctamente", async () => {
        const reservationDate = new Date();
        reservationDate.setDate(reservationDate.getDate() + 1);

        const reservation = await createReservationUseCase({
            dependencies: { reservationService: mockReservationService },
            payload: {
                customerName: "Juan Pérez",
                customerEmail: "juan@example.com",
                date: reservationDate,
                peopleCount: 3,
            },
        });

        expect(reservation).toHaveProperty("id");
        expect(reservation.customerName).toBe("Juan Pérez");
        expect(reservation.customerEmail).toBe("juan@example.com");
        expect(reservation.people).toBe(3);
        expect(reservation.status).toBe("PENDING");
        expect(mockReservationService.save).toHaveBeenCalledWith(reservation);
    });

    it("lanza error si el nombre del cliente no existe", async () => {
        await expect(
            createReservationUseCase({
                dependencies: { reservationService: mockReservationService },
                payload: {
                    customerName: "",
                    customerEmail: "test@example.com",
                    date: new Date(Date.now() + 1000 * 60 * 60),
                    peopleCount: 2,
                },
            })
        ).rejects.toThrow("El cliente es requerido.");
    });

    it("lanza error si la fecha es pasada", async () => {
        const pastDate = new Date(Date.now() - 1000 * 60 * 60);
        await expect(
            createReservationUseCase({
                dependencies: { reservationService: mockReservationService },
                payload: {
                    customerName: "Test",
                    customerEmail: "test@example.com",
                    date: pastDate,
                    peopleCount: 2,
                },
            })
        ).rejects.toThrow("La fecha de la reserva debe ser futura.");
    });

    it("lanza error si la cantidad de personas es inválida", async () => {
        const futureDate = new Date(Date.now() + 1000 * 60 * 60);
        await expect(
            createReservationUseCase({
                dependencies: { reservationService: mockReservationService },
                payload: {
                    customerName: "Test",
                    customerEmail: "test@example.com",
                    date: futureDate,
                    peopleCount: 0,
                },
            })
        ).rejects.toThrow("La cantidad de personas debe ser mayor a cero.");
    });
});
