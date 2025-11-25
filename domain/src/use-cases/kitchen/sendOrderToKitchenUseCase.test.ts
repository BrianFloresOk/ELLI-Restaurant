import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendOrderToKitchenUseCase } from "./sendOrderToKitchenUseCase";
import { OrderService } from "../../services/orders/OrderService";
import { Order } from "../../entities/order";

describe("sendOrderToKitchenUseCase", () => {
    const mockOrderService = {
        findById: vi.fn(),
        updateItemStatusByOrder: vi.fn(),
    } as Partial<OrderService> as OrderService;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debería enviar el pedido a cocina correctamente", async () => {
        const order: Order = {
            id: 1,
            waiterId: 10,
            status: "OPEN",
            tableId: 5,
            orderDate: new Date(),
        };
        mockOrderService.findById = vi.fn().mockResolvedValue(order);

        await sendOrderToKitchenUseCase({
            dependencies: { orderService: mockOrderService },
            payload: { orderId: 1, waiterId: 10 },
        });

        expect(mockOrderService.findById).toHaveBeenCalledWith(1);
        expect(mockOrderService.updateItemStatusByOrder).toHaveBeenCalledWith(
            1,
            "PENDING",
            "IN_PROGRESS"
        );
    });

    it("debería lanzar error si no se proporciona waiterId", async () => {
        await expect(
            sendOrderToKitchenUseCase({
                dependencies: { orderService: mockOrderService },
                payload: { orderId: 1, waiterId: 0 },
            })
        ).rejects.toThrow("El mozo es requerido para enviar el pedido a cocina.");

        expect(mockOrderService.findById).not.toHaveBeenCalled();
    });


    it("debería lanzar error si el pedido no existe", async () => {
        mockOrderService.findById = vi.fn().mockResolvedValue(null);

        await expect(
            sendOrderToKitchenUseCase({
                dependencies: { orderService: mockOrderService },
                payload: { orderId: 99, waiterId: 5 },
            })
        ).rejects.toThrow("Pedido no encontrado.");

        expect(mockOrderService.updateItemStatusByOrder).not.toHaveBeenCalled();
    });

    it("debería lanzar error si el mozo no es el asignado al pedido", async () => {
        const order: Order = {
            id: 2,
            waiterId: 1,
            status: "OPEN",
            tableId: 3,
            orderDate: new Date(),
        };

        mockOrderService.findById = vi.fn().mockResolvedValue(order);

        await expect(
            sendOrderToKitchenUseCase({
                dependencies: { orderService: mockOrderService },
                payload: { orderId: 2, waiterId: 5 },
            })
        ).rejects.toThrow("Este mozo no tiene permisos para enviar este pedido.");

        expect(mockOrderService.updateItemStatusByOrder).not.toHaveBeenCalled();
    });

    it("debería lanzar error si el pedido no está en estado OPEN", async () => {
        const order: Order = {
            id: 3,
            waiterId: 10,
            status: "CLOSED",
            tableId: 7,
            orderDate: new Date(),
        };

        mockOrderService.findById = vi.fn().mockResolvedValue(order);

        await expect(
            sendOrderToKitchenUseCase({
                dependencies: { orderService: mockOrderService },
                payload: { orderId: 3, waiterId: 10 },
            })
        ).rejects.toThrow(
            "Solo se pueden enviar a cocina pedidos que estén abiertos (estado: CLOSED)."
        );

        expect(mockOrderService.updateItemStatusByOrder).not.toHaveBeenCalled();
    });
});
