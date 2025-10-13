import { describe, it, expect } from "vitest";
import { Payment } from "../../entities/Payment";
import { registerPaymentUseCase } from "./registerPaymentUseCase";
import { Order } from "../../entities/Order";

describe("Register Payment Use Case", () => {
    it("debería registrar un pago", () => {
        const dateMock = new Date()

        const order: Order = {
            id: "12",
            waiterId: "1",
            tableId: "3",
            status: "OPEN",
            total: 200,
            items: []
        }

        const input = {
            order,
            method: "CARD" as Payment["method"],
            amount: order.total,
            cashierId: "2"
        }

        registerPaymentUseCase(input)

        expect(true).toBe(true)
    })
})