import { describe, it, expect, vi } from "vitest";
import { viewOrderStatusUseCase } from "./viewOrderInfoUseCase";
import { Order } from "../../entities/Order";
import { OrderService } from "../../services/orders/OrderService";

describe("viewOrderStatusUseCase", () => {
    const mockOrders: Order[] = [
        {
            id: "1", tableId: "T1", waiterId: "W1", status: "OPEN", total: 1000, items: [
                { id: "item-1", orderId: "1", productId: "p1", quantity: 1, unitPrice: 500, subtotal: 500, status: "PENDING" },
            ]
        },
        { id: "2", tableId: "T2", waiterId: "W2", status: "CLOSED", total: 2000, items: [] },
        { id: "3", tableId: "T3", waiterId: "W3", status: "OPEN", total: 1500, items: [] },
    ];



    it("debería devolver el estado y los ítems de una orden válida", async () => {
        const mockOrderService: OrderService = {
            findById: vi.fn().mockResolvedValue(mockOrders.find(o => o.id === "1")),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            list: vi.fn(),
            findByStatus: vi.fn(),
            findByTableId: vi.fn()
        };

        const result = await viewOrderStatusUseCase({
            dependencies: { orderService: mockOrderService },
            orderId: "1"
        });

        expect(result?.id).toBe("1");
        expect(result?.items.length).toBe(1);
        expect(result?.total).toBe(1000);
    });

    it("debería lanzar error si la orden es nula", () => {
        const mockOrderService: OrderService = {
            findById: vi.fn().mockResolvedValue(mockOrders.find(o => o.id === "1")),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            list: vi.fn(),
            findByStatus: vi.fn(),
            findByTableId: vi.fn()
        };
        // @ts-expect-error intencional para test
        expect(() => viewOrderStatusUseCase({ dependencies: { orderService: mockOrderService }, orderId: null })).toThrow("La orden es requerida.");
    });

    it("debería manejar una orden sin ítems", async () => {

        const mockOrderService: OrderService = {
            findById: vi.fn().mockResolvedValue(mockOrders.find(o => o.id === "3")),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            list: vi.fn(),
            findByStatus: vi.fn(),
            findByTableId: vi.fn()
        };

        const result = await viewOrderStatusUseCase({
            dependencies: { orderService: mockOrderService },
            orderId: "3"
        });

        expect(result?.items.length).toBe(0);
        expect(result?.status).toBe("OPEN");
    });
});
