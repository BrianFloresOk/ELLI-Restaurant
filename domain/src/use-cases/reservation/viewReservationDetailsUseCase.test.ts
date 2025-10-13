import { describe, it, expect } from "vitest"
import { viewReservationDetailsUseCase } from "./viewReservationDetailsUseCase"
import { Reservation } from "../../entities/Reservation"

describe("viewReservationDetailsUseCase", () => {
    const mockReservations: Reservation[] = [
        {
            id: "r1",
            tableId: "t1",
            date: new Date("2025-11-10T20:00:00Z"),
            people: 2,
            status: "CONFIRMED",
            customerName: "juan",
            customerEmail: "juan@mail.com",
            hour: "19:30",

        },
        {
            id: "r2",
            tableId: "t2",
            date: new Date("2025-11-12T21:00:00Z"),
            people: 4,
            status: "PENDING",
            customerName: "pablo",
            customerEmail: "pablo@mail.com",
            hour: "20:30",
        },
    ]

    it("debe retornar la reserva correspondiente al ID", () => {
        const reservation = viewReservationDetailsUseCase({
            reservationId: "r2",
            reservations: mockReservations,
        })

        expect(reservation).toBeDefined()
        expect(reservation.id).toBe("r2")
        expect(reservation.customerName).toBe("pablo")
    })

    it("debe lanzar error si no se pasa un ID", () => {
        expect(() =>
            viewReservationDetailsUseCase({
                reservationId: "",
                reservations: mockReservations,
            })
        ).toThrow("El ID de la reserva es requerido.")
    })

    it("debe lanzar error si no hay reservas cargadas", () => {
        expect(() =>
            viewReservationDetailsUseCase({
                reservationId: "r1",
                reservations: [],
            })
        ).toThrow("No hay reservas disponibles para consultar.")
    })

    it("debe lanzar error si no se encuentra la reserva", () => {
        expect(() =>
            viewReservationDetailsUseCase({
                reservationId: "r999",
                reservations: mockReservations,
            })
        ).toThrow("Reserva no encontrada.")
    })
})
