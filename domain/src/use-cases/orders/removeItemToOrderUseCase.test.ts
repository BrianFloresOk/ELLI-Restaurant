import { describe, it, expect } from "vitest";
import { Order } from "../../entities/Order";
import { removeItemFromOrderUseCase } from "./removeItemToOrderUseCase";


describe("removeItemFromOrderUseCase", () => {
    const baseOrder: Order = {
        id: "order-1",
        tableId: "mesa-1",
        waiterId: "waiter-1",
        status: "IN_PROGRESS",
        total: 3000,
        items: [
            { id: "item-1", orderId: "order-1", productId: "p1", quantity: 1, unitPrice: 1000, subtotal: 1000},
            { id: "item-2", orderId: "order-1", productId: "p2", quantity: 2, unitPrice: 1000, subtotal: 2000 },
        ],
    };

    it("elimina un ítem existente y recalcula el total", () => {
        const updatedOrder = removeItemFromOrderUseCase({
            order: structuredClone(baseOrder),
            productId: "p1",
        });

        expect(updatedOrder.items).toHaveLength(1);
        expect(updatedOrder.total).toBe(2000);
    });

    it("lanza error si el producto no existe", () => {
        const order = structuredClone(baseOrder);
        expect(() =>
            removeItemFromOrderUseCase({ order, productId: "no-existe" })
        ).toThrow(/no existe/);
    });

    it("vuelve a estado PENDING si se elimina el último producto", () => {
        const singleItemOrder = { ...baseOrder, items: [baseOrder.items[0]] };
        const updated = removeItemFromOrderUseCase({
            order: singleItemOrder,
            productId: "p1",
        });

        expect(updated.items).toHaveLength(0);
        expect(updated.status).toBe("PENDING");
    });
});
