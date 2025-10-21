import { describe, it, expect, vi } from "vitest";
import { viewOrderInfoUseCase } from "./viewOrderInfoUseCase";
import { Order } from "../../entities/Order";
import { OrderService } from "../../services/orders/OrderService";

describe("viewOrderInfoUseCase", () => {
    const mockOrders: Order[] = [
        {
            id: 1, tableId: 1, waiterId: 1, status: "OPEN", total: 1000, orderDate: new Date(), orderItems: [
                { id: 1, orderId: 1, productId: 1, quantity: 1, unitPrice: 500, subtotal: 500, status: "PENDING" },
            ]
        },
        { id: 2, tableId: 2, waiterId: 2, status: "CLOSED", total: 2000, orderDate: new Date(), orderItems: [] },
        { id: 3, tableId: 3, waiterId: 3, status: "OPEN", total: 1500, orderDate: new Date(), orderItems: [] },
    ];



    it("debería devolver el estado y los ítems de una orden válida", async () => {
        const mockOrderService: Partial<OrderService> = {
            findById: vi.fn().mockResolvedValue(mockOrders.find(o => o.id === 1)),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            list: vi.fn(),
            findByStatus: vi.fn(),
            findByTableId: vi.fn()
        };

        const result = await viewOrderInfoUseCase({
            dependencies: { orderService: mockOrderService as OrderService },
            orderId: 1
        });

        expect(result?.id).toBe(1);
        expect(result?.orderItems?.length).toBe(1);
        expect(result?.total).toBe(1000);
    });

    it("debería manejar una orden sin ítems", async () => {

        const mockOrderService: Partial<OrderService> = {
            findById: vi.fn().mockResolvedValue(mockOrders.find(o => o.id === 3)),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            list: vi.fn(),
            findByStatus: vi.fn(),
            findByTableId: vi.fn()
        };

        const result = await viewOrderInfoUseCase({
            dependencies: { orderService: mockOrderService as OrderService },
            orderId: 3
        });

        expect(result?.orderItems?.length).toBe(0);
        expect(result?.status).toBe("OPEN");
    });
});
