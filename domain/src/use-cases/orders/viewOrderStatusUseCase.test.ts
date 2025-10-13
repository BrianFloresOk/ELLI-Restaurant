import { describe, it, expect } from "vitest";
import { viewOrderStatusUseCase } from "../../use-cases/orders/viewOrderStatusUseCase";
import { Order } from "../../entities/Order";

describe("viewOrderStatusUseCase", () => {
    it("debería devolver el estado y los ítems de una orden válida", () => {
        const order: Order = {
            id: "order-1",
            tableId: "table-5",
            waiterId: "waiter-1",
            status: "OPEN",
            total: 250,
            items: [
                {
                    id: "item-1",
                    orderId: "order-1",
                    productId: "product-1",
                    quantity: 2,
                    unitPrice: 100,
                    subtotal: 200,
                    status: "IN_PROGRESS"
                },
                {
                    id: "item-2",
                    orderId: "order-1",
                    productId: "product-2",
                    quantity: 1,
                    unitPrice: 50,
                    subtotal: 50,
                    status: "PENDING"
                }
            ]
        };

        const result = viewOrderStatusUseCase({ order });

        expect(result.status).toBe("OPEN");
        expect(result.items.length).toBe(2);
        expect(result.total).toBe(250);
    });

    it("debería lanzar error si la orden es nula", () => {
        // @ts-expect-error intencional para test
        expect(() => viewOrderStatusUseCase({ order: null })).toThrow("La orden es requerida.");
    });

    it("debería manejar una orden sin ítems", () => {
        const order: Order = {
            id: "order-2",
            tableId: "table-3",
            waiterId: "waiter-2",
            status: "OPEN",
            total: 0,
            items: []
        };

        const result = viewOrderStatusUseCase({ order });

        expect(result.items.length).toBe(0);
        expect(result.status).toBe("OPEN");
    });
});
