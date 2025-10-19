import { describe, it, expect, vi } from "vitest";
import { createOrderUseCase } from "./createOrderUseCase";
import { OrderService } from "../../services/orders/OrderService";
import { TableService } from "domain/src/services";

describe("createOrderUseCase", () => {

    const mockOrderService: OrderService = {
        save: vi.fn().mockResolvedValue(undefined),
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
        updateItemStatusByOrder: vi.fn().mockResolvedValue(undefined),
    };

    const mockTableService: TableService = {
        update: vi.fn().mockResolvedValue(undefined),
        findById: vi.fn(),
    };

    it("crea un pedido vacío correctamente", async () => {
        await createOrderUseCase({
            dependencies: { orderService: mockOrderService, tableService: mockTableService },
            payload: {
                tableId: 1,
                waiterId: 123,
            },
        });

        expect(mockOrderService.save).toHaveBeenCalledTimes(1);
    });

    it("lanza error si falta el ID de mesa", async () => {
        await expect(
            createOrderUseCase({
                dependencies: { orderService: mockOrderService, tableService: mockTableService },
                // @ts-expect-error: testing invalid input
                payload: { waiterId: 1 },
            })
        ).rejects.toThrow("Table ID is required");
    });

    it("lanza error si falta el mozo", async () => {
        await expect(
            createOrderUseCase({
                dependencies: { orderService: mockOrderService, tableService: mockTableService },
                // @ts-expect-error: testing invalid input
                payload: { tableId: 1 },
            })
        ).rejects.toThrow("Waiter ID is required");
    });
});
