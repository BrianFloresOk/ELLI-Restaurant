import { describe, it, expect } from "vitest";
import { Product } from "../../entities/Product";
import { createOrderUseCase } from "./createOrderUseCase";
import { addItemToOrderUseCase } from "./addItemToOrderUseCase";


describe("addItemToOrderUseCase", () => {
    const mockProduct1: Product = {
        id: "p1",
        name: "Pizza Margarita",
        price: 2000,
        type: "DISH",
        categoryId: "1"
    };

    const mockProduct2: Product = {
        id: "p2",
        name: "Empanada de carne",
        price: 800,
        type: "DISH",
        categoryId: "2"
    };

    it("agrega un producto nuevo a la orden", () => {
        const order = createOrderUseCase({
            tableId: "mesa-1",
            waiterId: "waiter-1",
            items: [{ product: mockProduct1, quantity: 1 }],
        });

        const updatedOrder = addItemToOrderUseCase({
            order,
            product: mockProduct2,
            quantity: 3,
        });

        expect(updatedOrder.items).toHaveLength(2);
        expect(updatedOrder.total).toBe(2000 + 3 * 800);
        expect(updatedOrder.status).toBe("IN_PROGRESS");
    });

    it("incrementa la cantidad si el producto ya está en la orden", () => {
        const order = createOrderUseCase({
            tableId: "mesa-1",
            waiterId: "waiter-1",
            items: [{ product: mockProduct1, quantity: 1 }],
        });

        const updatedOrder = addItemToOrderUseCase({
            order,
            product: mockProduct1,
            quantity: 2,
        });

        expect(updatedOrder.items[0].quantity).toBe(3);
        expect(updatedOrder.total).toBe(3 * 2000);
    });

    it("lanza error si la cantidad es inválida", () => {
        const order = createOrderUseCase({
            tableId: "mesa-1",
            waiterId: "waiter-1",
            items: [{ product: mockProduct1, quantity: 1 }],
        });

        expect(() =>
            addItemToOrderUseCase({ order, product: mockProduct2, quantity: 0 })
        ).toThrow("La cantidad debe ser mayor que cero.");
    });

    it("no permite modificar pedidos cerrados", () => {
        const order = createOrderUseCase({
            tableId: "mesa-1",
            waiterId: "waiter-1",
            items: [{ product: mockProduct1, quantity: 1 }],
        });
        order.status = "COMPLETED";

        expect(() =>
            addItemToOrderUseCase({ order, product: mockProduct2, quantity: 1 })
        ).toThrow(/No se puede modificar un pedido/);
    });
});
