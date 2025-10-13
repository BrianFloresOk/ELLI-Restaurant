import { describe, it, expect, beforeEach } from "vitest";
import { markOrderItemAsReadyUseCase } from "./markOrderItemAsReadyUseCase";
import { OrderItem } from "../../entities/OrderItem";
import { Order } from "../../entities/Order";
import { ItemOrderStatus } from "../../utils/types/ItemOrderStatus";


describe("markOrderItemAsReadyUseCase", () => {
    const BASE_ITEMS: OrderItem[] = [
        { id: "item-1", orderId: "order-1", productId: "p1", quantity: 1, unitPrice: 10, subtotal: 10, status: "IN_PROGRESS" as ItemOrderStatus },
        { id: "item-2", orderId: "order-1", productId: "p2", quantity: 2, unitPrice: 5, subtotal: 10, status: "PENDING" as ItemOrderStatus },
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

    it("debería cambiar el estado de un ítem de IN_PROGRESS a COMPLETED", () => {
        const updatedOrder = markOrderItemAsReadyUseCase({
            order: orderToTest,
            productId: "p1",
        });

        const completedItem = updatedOrder.items.find(item => item.productId === "p1");

        expect(completedItem?.status).toBe("COMPLETED");
    });

    it("lanza error si se intenta marcar un ítem en estado PENDING", () => {
        expect(() =>
            markOrderItemAsReadyUseCase({
                order: orderToTest,
                productId: "p2"
            })
        ).toThrow(/Solo se pueden marcar como listos los ítems en estado IN_PROGRESS\. El estado actual es PENDING\./);
    });

    it("lanza error si se intenta marcar un ítem que ya está COMPLETED", () => {
        expect(() =>
            markOrderItemAsReadyUseCase({
                order: orderToTest,
                productId: "p3"
            })
        ).toThrow(/Solo se pueden marcar como listos los ítems en estado IN_PROGRESS\. El estado actual es COMPLETED\./);
    });

    it("lanza error si el producto no existe en el pedido", () => {
        expect(() =>
            markOrderItemAsReadyUseCase({
                order: orderToTest,
                productId: "no-existe"
            })
        ).toThrow(/no existe en el pedido/);
    });
});