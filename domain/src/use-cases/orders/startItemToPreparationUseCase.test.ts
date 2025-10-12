import { describe, it, expect, beforeEach } from "vitest";
import { Order } from "../../entities/Order";
import { OrderItem } from "../../entities/OrderItem";
import { ItemOrderStatus } from "../../utils/types/ItemOrderStatus";
import { startItemPreparationUseCase } from "./startItemToPreparationUseCase";


describe("startItemPreparationUseCase", () => {
    const BASE_ITEMS: OrderItem[] = [
        { id: "item-1", orderId: "order-1", productId: "p1", quantity: 1, unitPrice: 10, subtotal: 10, status: "PENDING" as ItemOrderStatus },
        { id: "item-2", orderId: "order-1", productId: "p2", quantity: 2, unitPrice: 5, subtotal: 10, status: "IN_PROGRESS" as ItemOrderStatus },
        { id: "item-3", orderId: "order-1", productId: "p3", quantity: 3, unitPrice: 3, subtotal: 9, status: "COMPLETED" as ItemOrderStatus },
    ];

    const BASE_ORDER: Order = {
        id: "order-1",
        tableId: "mesa-1",
        waiterId: "waiter-1",
        status: "OPEN",
        total: 29,
        items: structuredClone(BASE_ITEMS),
    };

    let orderToTest: Order;

    beforeEach(() => {
        orderToTest = structuredClone(BASE_ORDER);
    });

    it("debería cambiar el estado de un ítem de PENDING a IN_PROGRESS", () => {
        const updatedOrder = startItemPreparationUseCase({
            order: orderToTest,
            productId: "p1",
        });

        const preparedItem = updatedOrder.items.find(item => item.productId === "p1");

        expect(preparedItem?.status).toBe("IN_PROGRESS");
        expect(updatedOrder.status).toBe("OPEN");
    });

    it("debería devolver la misma orden si el item ya estaba en IN_PROGRESS (si la validación lo permitiera - pero falla por validación)", () => {
        const order = structuredClone(BASE_ORDER);

        expect(() =>
            startItemPreparationUseCase({ order, productId: "p2" })
        ).toThrow(/El ítem ya está en estado IN_PROGRESS/);

        const p2Status = order.items.find(item => item.productId === "p2")?.status;
        expect(p2Status).toBe("IN_PROGRESS");
    });

    it("lanza error si el ítem ya está en un estado final (e.g., COMPLETED)", () => {
        // El ítem 'p3' está en 'COMPLETED'
        expect(() =>
            startItemPreparationUseCase({ order: orderToTest, productId: "p3" })
        ).toThrow(/El ítem ya está en estado COMPLETED/);
    });

    it("lanza error si el producto no existe en el pedido", () => {
        expect(() =>
            startItemPreparationUseCase({ order: orderToTest, productId: "no-existe" })
        ).toThrow(/no existe en el pedido/);
    });

    it("lanza error si la orden no está en el estado requerido (OPEN)", () => {
        orderToTest.status = "CLOSED";

        expect(() =>
            startItemPreparationUseCase({ order: orderToTest, productId: "p1" })
        ).toThrow(/No se puede modificar un pedido con estado CLOSED/);
    });

    it("lanza error si la orden es nula", () => {
        expect(() =>
            startItemPreparationUseCase({ order: null as any, productId: "p1" })
        ).toThrow(/El pedido es requerido/);
    });
});