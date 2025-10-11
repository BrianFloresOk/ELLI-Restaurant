import { describe, expect, test } from "vitest";
import { sendOrderToKitchenUseCase } from "./sendOrderToKitchenUseCase";
import { Order } from "../../entities/Order";


describe("sendOrderToKitchenUseCase", () => {
    test("debería enviar un pedido pendiente a cocina", () => {
        const order : Order = {
            id: "1",
            tableId: "10",
            waiterId: "w1",
            items: [{ id: "i1", productId: "p1", quantity: 2, unitPrice: 100, subtotal: 200, orderId: "1" }],
            status: "PENDING",
            total: 200,
        };

        const result = sendOrderToKitchenUseCase({ order, waiterId: "w1" });

        expect(result.status).toBe("IN_PROGRESS");
    });

    test("debería lanzar error si el pedido no está pendiente", () => {
        const order : Order = { id: "1", tableId: "10", waiterId: "w1", items: [], status: "COMPLETED", total: 0 };

        expect(() =>
            sendOrderToKitchenUseCase({ order, waiterId: "w1" })
        ).toThrow("Solo se pueden enviar a cocina pedidos pendientes.");
    });
});
