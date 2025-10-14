import { describe, it, expect, vi } from "vitest";
import { Order } from "../../entities/Order";
import { removeItemFromOrderUseCase } from "./removeItemFromOrderUseCase";
import { OrderService } from "../../services/orders/OrderService";

describe("removeItemFromOrderUseCase", () => {
    const mockOrderService: OrderService = {
        findById: vi.fn(),
        save: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        list: vi.fn(),
        findByStatus: vi.fn(),
        findByTableId: vi.fn()
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

    it("elimina un producto existente y recalcula el total", async () => {
        const updatedOrder = await removeItemFromOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: {
                order: structuredClone(baseOrder),
                productId: "p2",
            },
        });

        expect(updatedOrder.items.find(i => i.productId === "p2")).toBeUndefined();
        expect(updatedOrder.items).toHaveLength(1);
        expect(updatedOrder.total).toBe(1000);
        expect(mockOrderService.update).toHaveBeenCalledWith(updatedOrder.id, updatedOrder);
    });

    it("lanza error si el producto no existe en la orden", async () => {
        await expect(
            removeItemFromOrderUseCase({
                dependencies: { orderService: mockOrderService },
                payload: {
                    order: structuredClone(baseOrder),
                    productId: "p3",
                },
            })
        ).rejects.toThrow(/no existe en el pedido/);
    });

    it("lanza error si el item no está en estado PENDING", async () => {
        const orderWithCompletedItem = structuredClone(baseOrder);
        orderWithCompletedItem.items[1].status = "COMPLETED";

        await expect(
            removeItemFromOrderUseCase({
                dependencies: { orderService: mockOrderService },
                payload: {
                    order: orderWithCompletedItem,
                    productId: "p2",
                },
            })
        ).rejects.toThrow(/No se puede eliminar el producto/);
    });

    it("lanza error si el pedido no está abierto", async () => {
        const closedOrder = structuredClone(baseOrder);
        closedOrder.status = "CLOSED";

        await expect(
            removeItemFromOrderUseCase({
                dependencies: { orderService: mockOrderService },
                payload: {
                    order: closedOrder,
                    productId: "p1",
                },
            })
        ).rejects.toThrow(/No se puede modificar un pedido/);
    });
});
