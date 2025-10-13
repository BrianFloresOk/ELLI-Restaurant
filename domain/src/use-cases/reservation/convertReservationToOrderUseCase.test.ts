import { describe, it, expect } from "vitest"
import { convertReservationToOrderUseCase } from "./convertReservationToOrderUseCase"
import { Reservation } from "../../entities/Reservation"
import { Order } from "../../entities/Order"

describe("convertReservationToOrderUseCase", () => {
    const baseReservation: Reservation = {
        id: "r1",
        tableId: "t1",
        date: new Date("2025-10-20T20:00:00Z"),
        people: 2,
        status: "CONFIRMED",
        customerName: "Juan",
        customerEmail: "juan@mail.com",
        hour: "20:00"
    }

    it("debe crear un pedido a partir de una reserva confirmada", () => {
        const input = {
            reservation: { ...baseReservation },
            existingOrders: [],
            waiterId: "w1",
        }

        const order = convertReservationToOrderUseCase(input)

        expect(order).toHaveProperty("id")
        expect(order.tableId).toBe("t1")
        expect(order.waiterId).toBe("w1")
        expect(order.status).toBe("OPEN")
        expect(order.total).toBe(0)
    })

    it("debe lanzar error si la reserva no está confirmada", () => {
        const reservation : Reservation = { ...baseReservation, status: "PENDING" }

        expect(() =>
            convertReservationToOrderUseCase({
                reservation,
                existingOrders: [],
            })
        ).toThrow("Solo las reservas confirmadas pueden convertirse en pedidos.")
    })

    it("debe lanzar error si no tiene mesa asignada", () => {
        const reservation = { ...baseReservation, tableId: undefined as any }

        expect(() =>
            convertReservationToOrderUseCase({
                reservation,
                existingOrders: [],
            })
        ).toThrow("La reserva debe tener una mesa asignada.")
    })

    it("debe lanzar error si ya existe un pedido activo para esa mesa", () => {
        const reservation = { ...baseReservation }
        const existingOrders: Order[] = [
            {
                id: "o1",
                tableId: "t1",
                waiterId: "w2",
                status: "OPEN",
                total: 100,
                items: [],
            },
        ]

        expect(() =>
            convertReservationToOrderUseCase({
                reservation,
                existingOrders,
            })
        ).toThrow("La mesa ya tiene un pedido activo.")
    })

    it("debe asignar 'unknown' si no se pasa waiterId", () => {
        const reservation = { ...baseReservation }

        const order = convertReservationToOrderUseCase({
            reservation,
            existingOrders: [],
        })

        expect(order.waiterId).toBe("unknown")
    })
})
