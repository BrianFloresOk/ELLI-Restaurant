import { closeOrderUseCase } from "./closeOrderUseCase";
import { Order } from "../../entities/Order";
import { describe, expect, it } from "vitest";

describe("closeOrderUseCase (dominio puro)", () => {
    const baseOrder: Order = {
        id: "1",
        tableId: "T1",
        waiterId: "W1",
        status: "COMPLETED",
        total: 100,
        items: []
    };

    it("Cierra correctamente una orden en estado COMPLETED", () => {
        const result = closeOrderUseCase(baseOrder);
        expect(result.status).toBe("CLOSED");
    });

    it("Lanza error si la orden ya está cerrada", () => {
        const closedOrder : Order = { ...baseOrder, status: "CLOSED" };
        expect(() => closeOrderUseCase(closedOrder)).toThrow("La orden ya está cerrada.");
    });

    it("Lanza error si la orden está cancelada", () => {
        const cancelledOrder : Order = { ...baseOrder, status: "CANCELLED" };
        expect(() => closeOrderUseCase(cancelledOrder)).toThrow("No se puede cerrar una orden cancelada.");
    });

    it("Lanza error si la orden no está en estado COMPLETED", () => {
        const pendingOrder : Order = { ...baseOrder, status: "PENDING" };
        expect(() => closeOrderUseCase(pendingOrder)).toThrow("Solo se pueden cerrar órdenes marcadas como COMPLETED.");
    });
});
