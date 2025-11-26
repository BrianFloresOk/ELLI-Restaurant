import { describe, it, expect, vi, beforeEach } from "vitest";

import { closeOrderUseCase } from "./closeOrderUseCase";
import { OrderService } from "../../services/orders/OrderService";
import { TableService } from "../../services/table/TableService";
import { ProductService } from "../../services/product/ProductService";

describe("closeOrderUseCase", () => {
    const mockOrder = {
        id: 1,
        tableId: 5,
        waiterId: 2,
        status: "OPEN",
        orderDate: new Date("2025-10-20"),
        orderItems: [
            { productId: 10, quantity: 2 },
            { productId: 20, quantity: 1 },
        ],
    };

    const mockProduct1 = { id: 10, name: "Pizza", price: 100 };
    const mockProduct2 = { id: 20, name: "Soda", price: 50 };

    const orderService = {
        findById: vi.fn().mockResolvedValue(mockOrder),
        update: vi.fn().mockResolvedValue(true),
    };

    const tableService = {
        update: vi.fn().mockResolvedValue(true),
    };

    const productService = {
        findById: vi.fn().mockImplementation(async (id: number) =>
            id === 10 ? mockProduct1 : mockProduct2
        ),
    };

    const makeDependencies = () => ({
        orderService: orderService as unknown as OrderService,
        tableService: tableService as unknown as TableService,
        productService: productService as unknown as ProductService,
    });

    beforeEach(() => {
        vi.clearAllMocks();
        orderService.findById.mockResolvedValue(mockOrder);
        productService.findById.mockImplementation(async (id: number) =>
            id === 10 ? mockProduct1 : mockProduct2
        );
    });

    it("debería cerrar una orden abierta y calcular el total", async () => {
        const dependencies = makeDependencies();
        const result = await closeOrderUseCase({ dependencies, orderId: 1 });

        expect(orderService.findById).toHaveBeenCalledWith(1);
        expect(orderService.update).toHaveBeenCalled();
        expect(tableService.update).toHaveBeenCalledWith(5, { status: "AVAILABLE" });
        expect(result.total).toBe(250);
        expect(result.status).toBe("CLOSED");
    });

    it("debería lanzar un error si la orden no existe", async () => {
        const dependencies = makeDependencies();
        orderService.findById.mockResolvedValueOnce(null);

        await expect(closeOrderUseCase({ dependencies, orderId: 999 })).rejects.toThrow("Orden no encontrada.");
    });

    it("debería lanzar un error si la orden no está en estado OPEN", async () => {
        const dependencies = makeDependencies();
        orderService.findById.mockResolvedValueOnce({ ...mockOrder, status: "CLOSED" });

        await expect(closeOrderUseCase({ dependencies, orderId: 1 }))
            .rejects.toThrow("Solo se pueden cerrar órdenes en estado OPEN.");
    });
});
