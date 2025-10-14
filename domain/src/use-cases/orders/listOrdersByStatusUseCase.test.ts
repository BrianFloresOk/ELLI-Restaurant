import { describe, it, expect, vi } from "vitest";
import { listOrdersByStatusUseCase } from "./listOrdersByStatusUseCase";
import { Order } from "../../entities/Order";
import { OrderService } from "../../services/orders/OrderService";

describe("listOrdersByStatusUseCase", () => {
    const mockOrders: Order[] = [
        { id: "1", tableId: "T1", waiterId: "W1", status: "OPEN", total: 1000, items: [] },
        { id: "2", tableId: "T2", waiterId: "W2", status: "CLOSED", total: 2000, items: [] },
        { id: "3", tableId: "T3", waiterId: "W3", status: "OPEN", total: 1500, items: [] },
    ];

    it("devuelve solo los pedidos con el estado solicitado", async () => {
        const mockOrderService: OrderService = {
            findById: vi.fn(),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            list: vi.fn(),
            findByStatus: vi.fn().mockResolvedValue(
                mockOrders.filter(o => o.status === "OPEN")
            )
        };

        const result = await listOrdersByStatusUseCase({
            dependencies: { orderService: mockOrderService },
            status: "OPEN"
        });

        expect(result).toHaveLength(2);
        expect(result.every(o => o.status === "OPEN")).toBe(true);
    });

    it("lanza error si no hay pedidos con ese estado", async () => {
        const mockOrderService: OrderService = {
            findById: vi.fn(),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            list: vi.fn(),
            findByStatus: vi.fn().mockResolvedValue([])
        };

        await expect(
            listOrdersByStatusUseCase({
                dependencies: { orderService: mockOrderService },
                status: "CLOSED"
            })
        ).rejects.toThrow('No hay pedidos con el estado "CLOSED".');
    });
});
