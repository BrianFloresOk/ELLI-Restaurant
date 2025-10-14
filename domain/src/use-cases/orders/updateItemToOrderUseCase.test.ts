import { describe, it, expect, vi } from "vitest";
import { Order } from "../../entities/Order";
import { OrderService } from "../../services/orders/OrderService";
import { updateItemToOrderUseCase } from "./updateItemToOrderUseCase";

describe("updateItemToOrderUseCase (con dependencia inyectada)", () => {

    const mockOrderService: OrderService = {
        findById: vi.fn(),
        save: vi.fn().mockResolvedValue(undefined),
        update: vi.fn(),
        delete: vi.fn(),
        list: vi.fn(),
        findByStatus: vi.fn()
    };

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

    it("actualiza la cantidad y recalcula el total usando OrderService", () => {
        const updatedOrder = updateItemToOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: {
                order: structuredClone(baseOrder),
                productId: "p2",
                newQuantity: 3,
            },
        });

        expect(updatedOrder.items.find(i => i.productId === "p2")?.quantity).toBe(3);
        expect(updatedOrder.total).toBe(4000);
    });

    it("lanza error si el producto no existe", () => {
        expect(() =>
            updateItemToOrderUseCase({
                dependencies: { orderService: mockOrderService },
                payload: {
                    order: structuredClone(baseOrder),
                    productId: "p3",
                    newQuantity: 2,
                },
            })
        ).toThrow(/no existe en la orden/);
    });
});
