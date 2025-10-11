import { describe, it, expect } from "vitest";
import { cancelOrderUseCase } from "./cancelOrderUseCase";
import { Order } from "../../entities/Order";

describe("cancelOrderUseCase", () => {
    it("debería cancelar un pedido pendiente", () => {
        const order: Order = {
            id: "1",
            tableId: "3",
            waiterId: "w1",
            status: "PENDING",
            items: [],
            total: 0,
        };

        const result = cancelOrderUseCase({ order, userId: "admin-1" });

        expect(result.status).toBe("CANCELLED");
    });

    it("debería lanzar error si el pedido ya está listo", () => {
        const order: Order = {
            id: "1",
            tableId: "3",
            waiterId: "w1",
            items: [],
            total: 0,
            status: "COMPLETED"
        };

        expect(() =>
            cancelOrderUseCase({ order, userId: "w1" })
        ).toThrow("Solo se pueden cancelar pedidos pendientes o en progreso.");
    });
});
