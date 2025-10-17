import { describe, it, expect, beforeEach } from "vitest";
import { markOrderItemAsReadyUseCase } from "./markOrderItemAsReadyUseCase";
import { OrderItem } from "../../entities/OrderItem";
import { Order } from "../../entities/Order";
import { ItemOrderStatus } from "../../utils/types/ItemOrderStatus";


describe("markOrderItemAsReadyUseCase", () => {
    const BASE_ITEMS: OrderItem[] = [
        { id: "item-1", orderId: 1, productId: 1, quantity: 1, unitPrice: 10, subtotal: 10, status: "IN_PROGRESS" as ItemOrderStatus },
        { id: "item-2", orderId: 1, productId: 2, quantity: 2, unitPrice: 5, subtotal: 10, status: "PENDING" as ItemOrderStatus },
        { id: "item-3", orderId: 1, productId: 3, quantity: 3, unitPrice: 3, subtotal: 9, status: "COMPLETED" as ItemOrderStatus },
    ];

    const BASE_ORDER: Order = {
        id: "1",
        tableId: 1,
        waiterId: 1,
        status: "OPEN",
        total: 29,
        orderDate: new Date(),
    };

    let orderToTest: Order;

    beforeEach(() => {
        orderToTest = structuredClone(BASE_ORDER);
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