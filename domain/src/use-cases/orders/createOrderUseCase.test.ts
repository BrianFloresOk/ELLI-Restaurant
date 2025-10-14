import { describe, it, expect, vi } from "vitest";
import { Product } from "../../entities/Product";
import { createOrderUseCase } from "./createOrderUseCase";
import { OrderService } from "../../services/orders/OrderService";

describe("createOrderUseCase", () => {
    const productA: Product = {
        id: "1",
        name: "Pizza Margherita",
        price: 2500,
        type: "DISH",
        categoryId: "1"
    };

    const productB: Product = {
        id: "2",
        name: "Cerveza Artesanal",
        price: 1200,
        type: "DRINK",
        categoryId: "2"
    };

    const mockOrderService: OrderService = {
        findById: vi.fn(),
        save: vi.fn().mockResolvedValue(undefined),
        update: vi.fn(),
        delete: vi.fn(),
        list: vi.fn(),
        findByStatus: vi.fn(),
        findByTableId: vi.fn()
    };

    it("crea un pedido vacío correctamente", async () => {
        const order = await createOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: {
                tableId: "T-1",
                waiterId: "W-123",
            },
        });

        expect(order).toHaveProperty("id");
        expect(order.tableId).toBe("T-1");
        expect(order.waiterId).toBe("W-123");
        expect(order.status).toBe("OPEN");
        expect(order.total).toBe(0);
        expect(mockOrderService.save).toHaveBeenCalledTimes(1);
    });

    it("crea un pedido con productos correctamente", async () => {
        const order = await createOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: {
                tableId: "T-2",
                waiterId: "W-001",
                items: [
                    { product: productA, quantity: 2 },
                    { product: productB, quantity: 1 },
                ],
            },
        });

        expect(order.total).toBe(2500 * 2 + 1200);
        expect(order.status).toBe("OPEN");
        expect(order.items).toHaveLength(2);
        expect(mockOrderService.save).toHaveBeenCalledTimes(2); // dos llamadas en total
    });

    it("lanza error si falta el ID de mesa", async () => {
        await expect(
            createOrderUseCase({
                dependencies: { orderService: mockOrderService },
                // @ts-expect-error: testing invalid input
                payload: { waiterId: "W-1" },
            })
        ).rejects.toThrow("Table ID is required");
    });

    it("lanza error si falta el mozo", async () => {
        await expect(
            createOrderUseCase({
                dependencies: { orderService: mockOrderService },
                // @ts-expect-error: testing invalid input
                payload: { tableId: "T-1" },
            })
        ).rejects.toThrow("Waiter ID is required");
    });
});
