import { describe, it, expect, vi } from "vitest";
import { createOrderUseCase } from "./createOrderUseCase";
import { OrderService } from "../../services/orders/OrderService";
import { TableService } from "../../services/table/TableService";
import { TableOccupied } from "../../utils/errors/TableErrors";

describe("createOrderUseCase", () => {
    const orderService: Partial<OrderService> = {
        save: vi.fn().mockResolvedValue(true),
    };

    const tableService: Partial<TableService> = {
        verifyTableAvailability: vi.fn().mockResolvedValue(true),
        update: vi.fn().mockResolvedValue(true),
    };

    const dependencies = {
        orderService: orderService as OrderService,
        tableService: tableService as TableService,
    };

    const validPayload = {
        tableId: 5,
        waiterId: 2,
    };

    it("debería crear una orden y actualizar la mesa a 'OCCUPIED'", async () => {
        await createOrderUseCase({ dependencies, payload: validPayload });

        expect(tableService.verifyTableAvailability).toHaveBeenCalledWith(5);
        expect(orderService.save).toHaveBeenCalledWith(
            expect.objectContaining({
                tableId: 5,
                waiterId: 2,
                status: "OPEN",
            })
        );
        expect(tableService.update).toHaveBeenCalledWith(5, { status: "OCCUPIED" });
    });

    it("debe lanzar TableOccupied si la mesa no está disponible", async () => {
        const mockOrderService = { save: vi.fn() };
        const mockTableService = {
            verifyTableAvailability: vi.fn().mockResolvedValue(false),
            update: vi.fn(),
        };

        await expect(
            createOrderUseCase({
                dependencies: { orderService: mockOrderService as unknown as OrderService, tableService: mockTableService as unknown as TableService },
                payload: { tableId: 1, waiterId: 2 },
            })
        ).rejects.toThrow(TableOccupied); // ✅

        // O también puedes hacerlo así:
        await expect(
            createOrderUseCase({
                dependencies: { orderService: mockOrderService as unknown as OrderService, tableService: mockTableService as unknown as TableService },
                payload: { tableId: 1, waiterId: 2 },
            })
        ).rejects.toThrowError("currently occupied");
    });

    it("debería lanzar un error si falta tableId", async () => {
        const invalidPayload = { ...validPayload, tableId: 0 };

        await expect(
            createOrderUseCase({ dependencies, payload: invalidPayload })
        ).rejects.toThrow("Table ID is required");
    });

    it("debería lanzar un error si falta waiterId", async () => {
        const invalidPayload = { ...validPayload, waiterId: 0 };

        await expect(
            createOrderUseCase({ dependencies, payload: invalidPayload })
        ).rejects.toThrow("Waiter ID is required");
    });
});
