import { describe, it, expect, vi } from "vitest";
import { cancelOrderUseCase } from "./cancelOrderUseCase";
import { Order } from "../../entities/Order";
import { OrderService } from "../../services/orders/OrderService";

describe("cancelOrderUseCase", () => {
    const mockOrder: Order = {
        id: 1,
        tableId: 1,
        waiterId: 1,
        status: "OPEN",
        orderDate: new Date(),
    };

    const mockOrderService: Partial<OrderService> = {
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
            dependencies: { orderService: mockOrderService as OrderService },
            payload: { orderId: 1, userId: 1 }
        });

        expect(result.status).toBe("CANCELLED");
        expect(mockOrderService.update).toHaveBeenCalledWith(1, expect.objectContaining({ status: "CANCELLED" }));
    });

    it("lanza error si no se pasa el orderId", async () => {
        await expect(
            cancelOrderUseCase({
                dependencies: { orderService: mockOrderService as OrderService },
                payload: { orderId: 0, userId: 1 }
            })
        ).rejects.toThrow("El pedido es requerido.");
    });

    it("lanza error si no se pasa el userId", async () => {
        await expect(
            cancelOrderUseCase({
                dependencies: { orderService: mockOrderService as OrderService },
                payload: { orderId: 1, userId: 0 }
            })
        ).rejects.toThrow("El usuario que cancela el pedido es requerido.");
    });

    it("lanza error si el pedido no existe", async () => {
        const emptyService: Partial<OrderService> = {
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
                dependencies: { orderService: emptyService as OrderService },
                payload: { orderId: 999, userId: 1 }
            })
        ).rejects.toThrow("No se encontró el pedido");
    });
});
