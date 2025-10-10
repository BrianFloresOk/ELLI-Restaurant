import { describe, it, expect } from "vitest";
import { Product } from "../../entities/Product";
import { createOrderUseCase } from "./createOrderUseCase";


describe("createOrderUseCase", () => {
    const productA: Product = { id: "1", name: "Pizza Margherita", price: 2500, type: "DISH", categoryId: "1" };
    const productB: Product = { id: "2", name: "Cerveza Artesanal", price: 1200, type: "DRINK", categoryId: "2" };

    it("crea un pedido vacío correctamente", () => {
        const order = createOrderUseCase({
            tableId: "T-1",
            waiterId: "W-123",
        });

        expect(order).toHaveProperty("id");
        expect(order.tableId).toBe("T-1");
        expect(order.waiterId).toBe("W-123");
        expect(order.status).toBe("PENDING");
        expect(order.total).toBe(0);
    });

    it("crea un pedido con productos correctamente", () => {
        const order = createOrderUseCase({
            tableId: "T-2",
            waiterId: "W-001",
            items: [
                { product: productA, quantity: 2 },
                { product: productB, quantity: 1 },
            ],
        });

        expect(order.total).toBe(2500 * 2 + 1200);
        expect(order.status).toBe("PENDING");
    });

    it("lanza error si falta el ID de mesa", () => {
        // @ts-expect-error
        expect(() => createOrderUseCase({ waiterId: "W-1" })).toThrowError(
            "Table ID is required"
        );
    });

    it("lanza error si falta el mozo", () => {
        // @ts-expect-error
        expect(() => createOrderUseCase({ tableId: "T-1" })).toThrowError(
            "Waiter ID is required"
        );
    });
});
