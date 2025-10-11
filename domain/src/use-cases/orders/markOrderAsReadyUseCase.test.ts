import { describe, expect, test } from "vitest";
import { markOrderAsReadyUseCase } from "./markOrderAsReadyUseCase";
import { Order } from "../../entities/Order";

describe("markOrderAsReadyUseCase", () => {
    test("debería marcar un pedido en progreso como listo", () => {
        const order: Order = {
            id: "1",
            tableId: "5",
            waiterId: "w1",
            status: "IN_PROGRESS",
            items: [],
            total: 300,
        };

        const result = markOrderAsReadyUseCase({ order, chefId: "chef-01" });

        expect(result.status).toBe("COMPLETED");
    });

    test("debería lanzar error si el pedido no está en progreso", () => {
        const order: Order = {
            id: "1",
            tableId: "5",
            waiterId: "w1",
            status: "PENDING",
            items: [],
            total: 300,
        };

        expect(() =>
            markOrderAsReadyUseCase({ order, chefId: "chef-01" })
        ).toThrow("Solo se pueden marcar como listos los pedidos en progreso.");
    });
});
