import { describe, it, expect, vi, beforeEach } from "vitest";
import { closeOrderUseCase } from "./closeOrderUseCase";
import { Order } from "../../entities/Order";
import { OrderItem } from "../../entities/OrderItem";
import { OrderService } from "domain/src/services";

const mockOrderService: OrderService = {
    save: vi.fn(),
    findById: vi.fn(),
    findItemByProduct: vi.fn(),
    addItem: vi.fn(),
    updateItemQuantity: vi.fn(),
    removeItem: vi.fn(),
    closeOrder: vi.fn(),
    listItems: vi.fn(),
    findByStatus: vi.fn(),
    findByTableId: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    list: vi.fn(),
    updateItemStatusByOrder: vi.fn(),
};

describe("closeOrderUseCase", () => {
    const dependencies = { orderService: mockOrderService };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debería cerrar correctamente una orden abierta", async () => {
        // Arrange
        const mockOrder: Order = {
            id: 1,
            status: "OPEN",
            total: 0,
            waiterId: 1,
            orderDate: new Date(),
            tableId: 1,
            orderItems: [
                { id: 1, subtotal: 100 } as OrderItem,
                { id: 2, subtotal: 50 } as OrderItem,
            ],
        };

        vi.spyOn(mockOrderService, "findById").mockResolvedValueOnce(mockOrder);

        await closeOrderUseCase({ dependencies, orderId: 1 });

        expect(mockOrderService.findById).toHaveBeenCalledWith(1);
        expect(mockOrderService.update).toHaveBeenCalledWith(
            1,
            expect.objectContaining({
                status: "CLOSED",
                total: 150,
                closedDate: expect.any(Date),
            })
        );
    });

    it("debería lanzar error si la orden no existe", async () => {
        vi.spyOn(mockOrderService, "findById").mockResolvedValueOnce(null);

        await expect(
            closeOrderUseCase({ dependencies, orderId: 999 })
        ).rejects.toThrow("Orden no encontrada.");
    });

    it("debería lanzar error si la orden no está en estado OPEN", async () => {
        const mockOrder: Order = {
            id: 2,
            status: "CLOSED",
            waiterId: 1,
            orderDate: new Date(),
            tableId: 1,
            orderItems: [],
        };

        vi.spyOn(mockOrderService, "findById").mockResolvedValueOnce(mockOrder);

        await expect(
            closeOrderUseCase({ dependencies, orderId: 2 })
        ).rejects.toThrow("Solo se pueden cerrar órdenes en estado OPEN.");
    });

    it("debería calcular total 0 si no hay items", async () => {
        const mockOrder: Order = {
            id: 3,
            status: "OPEN",
            waiterId: 1,
            orderDate: new Date(),
            tableId: 1,
            orderItems: [],
        };

        vi.spyOn(mockOrderService, "findById").mockResolvedValueOnce(mockOrder);

        await closeOrderUseCase({ dependencies, orderId: 3 });

        expect(mockOrderService.update).toHaveBeenCalledWith(
            3,
            expect.objectContaining({ total: 0 })
        );
    });
});
