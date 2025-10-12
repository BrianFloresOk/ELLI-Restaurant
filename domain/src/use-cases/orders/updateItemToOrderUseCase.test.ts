import { describe, it, expect } from "vitest";
import { Order } from "../../entities/Order";
import { updateItemQuantityUseCase } from "./updateItemToOrderUseCase";

describe("updateItemQuantityUseCase", () => {
    const baseOrder: Order = {
        id: "order-1",
        tableId: "mesa-1",
        waiterId: "waiter-1",
        status: "OPEN",
        total: 3000,
        items: [
            { id: "item-1", orderId: "order-1", productId: "p1", quantity: 1, unitPrice: 1000, subtotal: 1000, status: "PENDING" },
            { id: "item-2", orderId: "order-1", productId: "p2", quantity: 2, unitPrice: 1000, subtotal: 2000, status: "PENDING" },
        ],
    };

    it("actualiza la cantidad de un producto existente y recalcula el total", () => {
        const updatedOrder = updateItemQuantityUseCase({
            order: structuredClone(baseOrder),
            productId: "p2",
            newQuantity: 3,
        });

        expect(updatedOrder.items.find(i => i.productId === "p2")?.quantity).toBe(3);
        expect(updatedOrder.total).toBe(4000);
    });

    it("lanza error si la cantidad es inválida", () => {
        expect(() =>
            updateItemQuantityUseCase({
                order: structuredClone(baseOrder),
                productId: "p1",
                newQuantity: -1,
            })
        ).toThrow("La cantidad debe ser mayor que cero.");
    });

    it("lanza error si el producto no existe", () => {
        expect(() =>
            updateItemQuantityUseCase({
                order: structuredClone(baseOrder),
                productId: "p3",
                newQuantity: 2,
            })
        ).toThrow(/no existe/);
    });
});
