import { describe, it, expect, vi } from "vitest";
import { cancelOrderUseCase } from "./cancelOrderUseCase";
import { Order } from "../../entities/Order";
import { OrderService } from "../../services/orders/OrderService";

describe("cancelOrderUseCase", () => {
    const mockOrder: Order = {
        id: "order-1",
        tableId: "T-1",
        waiterId: "W-1",
        status: "OPEN",
        total: 1000,
        items: []
    };

    const mockOrderService: OrderService = {
        findById: vi.fn().mockResolvedValue(mockOrder),
        save: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        list: vi.fn(),
        findByStatus: vi.fn(),
        findByTableId: vi.fn()
    };

    it("cancela un pedido correctamente", async () => {
        const result = await cancelOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: { orderId: "order-1", userId: "user-1" }
        });

        expect(result.status).toBe("CANCELLED");
        expect(mockOrderService.update).toHaveBeenCalledWith("order-1", expect.objectContaining({ status: "CANCELLED" }));
    });

    it("lanza error si no se pasa el orderId", async () => {
        await expect(
            cancelOrderUseCase({
                dependencies: { orderService: mockOrderService },
                payload: { orderId: "", userId: "user-1" }
            })
        ).rejects.toThrow("El pedido es requerido.");
    });

    it("lanza error si no se pasa el userId", async () => {
        await expect(
            cancelOrderUseCase({
                dependencies: { orderService: mockOrderService },
                payload: { orderId: "order-1", userId: "" }
            })
        ).rejects.toThrow("El usuario que cancela el pedido es requerido.");
    });

    it("lanza error si el pedido no existe", async () => {
        const emptyService: OrderService = {
            findById: vi.fn().mockResolvedValue(null),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            list: vi.fn(),
            findByStatus: vi.fn(),
            findByTableId: vi.fn()
        };

        await expect(
            cancelOrderUseCase({
                dependencies: { orderService: emptyService },
                payload: { orderId: "order-999", userId: "user-1" }
            })
        ).rejects.toThrow("No se encontró el pedido");
    });
});
