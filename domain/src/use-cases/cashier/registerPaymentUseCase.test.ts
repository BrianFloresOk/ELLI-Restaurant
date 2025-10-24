import { describe, it, expect, vi, beforeEach } from "vitest";
import { registerPaymentUseCase } from "./registerPaymentUseCase";
import { Order } from "../../entities/Order";
import { PaymentService } from "../../services/payment/PaymentService";
import { OrderService } from "../../services/orders/OrderService";
import { Payment } from "domain/src/entities";


const mockPaymentService: PaymentService = {
    save: vi.fn(),
};

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

describe("registerPaymentUseCase", () => {
    const dependencies = {
        paymentService: mockPaymentService,
        orderService: mockOrderService,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debería registrar un pago exitosamente y cerrar la orden", async () => {
        const mockOrder: Order = {
            id: 1,
            status: "CLOSED",
            waiterId: 1,
            orderDate: new Date(),
            tableId: 1,
        };

        vi.spyOn(mockOrderService, "findById").mockResolvedValueOnce(mockOrder);

        const payload = {
            orderId: 1,
            method: "CASH" as Payment["method"],
            amount: 200,
            cashierId: 10,
        };

        await registerPaymentUseCase({ dependencies, payload });

        expect(mockOrderService.findById).toHaveBeenCalledWith(1);
        expect(mockPaymentService.save).toHaveBeenCalledWith(
            expect.objectContaining({
                orderId: 1,
                method: "CASH" as Payment["method"],
                amount: 200,
                paidAt: expect.any(Date),
            })
        );
        expect(mockOrderService.update).toHaveBeenCalledWith(
            1,
            expect.objectContaining({ status: "IS_PAID" })
        );
    });

    it("debería lanzar error si la orden no existe", async () => {
        vi.spyOn(mockOrderService, "findById").mockResolvedValueOnce(null);

        const payload = {
            orderId: 999,
            method: "CASH" as Payment["method"],
            amount: 100,
            cashierId: 1,
        };

        await expect(
            registerPaymentUseCase({ dependencies, payload })
        ).rejects.toThrow("Orden no encontrada.");
    });

    it("debería lanzar error si la orden no está cerrada", async () => {
        const mockOrder: Order = {
            id: 2,
            status: "OPEN",
            waiterId: 1,
            orderDate: new Date(),
            tableId: 1,
        };

        vi.spyOn(mockOrderService, "findById").mockResolvedValueOnce(mockOrder);

        const payload = {
            orderId: 2,
            method: "CASH" as Payment["method"],
            amount: 100,
            cashierId: 5,
        };

        await expect(
            registerPaymentUseCase({ dependencies, payload })
        ).rejects.toThrow("Order must be closed.");
    });

    it("debería lanzar error si el método de pago no está definido", async () => {
        const mockOrder: Order = {
            id: 3,
            status: "CLOSED",
            waiterId: 1,
            orderDate: new Date(),
            tableId: 1,
        };

        vi.spyOn(mockOrderService, "findById").mockResolvedValueOnce(mockOrder);

        const payload = {
            orderId: 3,
            method: "" as Payment["method"],
            amount: 100,
            cashierId: 1,
        };

        await expect(
            registerPaymentUseCase({ dependencies, payload })
        ).rejects.toThrow("Payment method is required.");
    });

    it("debería lanzar error si el monto es inválido", async () => {
        const mockOrder: Order = {
            id: 4,
            status: "CLOSED",
            waiterId: 1,
            orderDate: new Date(),
            tableId: 1,
        };

        vi.spyOn(mockOrderService, "findById").mockResolvedValueOnce(mockOrder);

        const payload = {
            orderId: 4,
            method: "CARD" as Payment["method"],
            amount: 0,
            cashierId: 1,
        };

        await expect(
            registerPaymentUseCase({ dependencies, payload })
        ).rejects.toThrow("Payment amount must be greater than zero.");
    });

    it("debería lanzar error si el cashierId es inválido", async () => {
        const mockOrder: Order = {
            id: 5,
            status: "CLOSED",
            waiterId: 1,
            orderDate: new Date(),
            tableId: 1,
        };

        vi.spyOn(mockOrderService, "findById").mockResolvedValueOnce(mockOrder);

        const payload = {
            orderId: 5,
            method: "CASH" as Payment["method"],
            amount: 100,
            cashierId: 0,
        };

        await expect(
            registerPaymentUseCase({ dependencies, payload })
        ).rejects.toThrow("Cashier ID is required.");
    });
});
