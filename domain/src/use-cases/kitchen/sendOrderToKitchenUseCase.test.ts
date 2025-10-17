import { describe, expect, test } from "vitest";
import { sendOrderToKitchenUseCase } from "./sendOrderToKitchenUseCase";
import { Order } from "../../entities/Order";


describe("sendOrderToKitchenUseCase", () => {
    test("debería enviar un pedido pendiente a cocina", () => {
        const order : Order = {
            id: "1",
            tableId: 10,
            waiterId: 1,
            status: "OPEN",
            total: 200,
            orderDate: new Date(),
        };

        const result = sendOrderToKitchenUseCase({ order, waiterId: 1 });

        expect(result.status).toBe("OPEN");
    });

    test("debería lanzar error si el pedido no está pendiente", () => {
        const order : Order = { id: "1", tableId: 10, waiterId: 1, status: "CLOSED", total: 0, orderDate: new Date() };

        expect(() =>
            sendOrderToKitchenUseCase({ order, waiterId: 1 })
        ).toThrow("Solo se pueden enviar a cocina pedidos que esten abiertos.");
    });
});
