import { describe, it, expect } from "vitest";
import { Order } from "../../entities/Order";
import { OrderItem } from "../../entities/OrderItem";
import { removeItemFromOrderUseCase } from "./removeItemToOrderUseCase";
import { ItemOrderStatus } from "../../utils/types/ItemOrderStatus";

describe("removeItemFromOrderUseCase", () => {
    const baseItems: OrderItem[] = [
        { id: "item-1", orderId: "order-1", productId: "p1", quantity: 1, unitPrice: 1000, subtotal: 1000, status: "PENDING" as ItemOrderStatus },
        { id: "item-2", orderId: "order-1", productId: "p2", quantity: 2, unitPrice: 1000, subtotal: 2000, status: "PENDING" as ItemOrderStatus },
        { id: "item-3", orderId: "order-1", productId: "p3", quantity: 3, unitPrice: 500, subtotal: 1500, status: "IN_PROGRESS" as ItemOrderStatus }, // Item no removible
    ];

    const baseOrder: Order = {
        id: "order-1",
        tableId: "mesa-1",
        waiterId: "waiter-1",
        status: "OPEN",
        total: 4500,
        items: baseItems,
    };

    it("elimina un ítem PENDING y recalcula el total correctamente", () => {
        const orderToTest = structuredClone(baseOrder);

        const updatedOrder = removeItemFromOrderUseCase({
            order: orderToTest,
            productId: "p1",
        });

        expect(updatedOrder.items).toHaveLength(2);
        expect(updatedOrder.total).toBe(3500);
        expect(updatedOrder.items.some(item => item.productId === 'p1')).toBe(false);
    });

    it("lanza error si se intenta eliminar un ítem con estado diferente a PENDING", () => {
        const order = structuredClone(baseOrder);
        expect(() =>
            removeItemFromOrderUseCase({ order, productId: "p3" })
        ).toThrow(/No se puede eliminar el producto/);
        expect(order.items).toHaveLength(3);
    });

    it("lanza error si se intenta modificar un pedido que no está en estado OPEN", () => {
        const nonOpenOrder: Order = { ...baseOrder, status: "CANCELLED" };

        expect(() =>
            removeItemFromOrderUseCase({ order: nonOpenOrder, productId: "p1" })
        ).toThrow(/No se puede modificar un pedido con estado CANCELLED/);
    });

    it("lanza error si el producto no existe en el pedido", () => {
        const order = structuredClone(baseOrder);
        expect(() =>
            removeItemFromOrderUseCase({ order, productId: "no-existe" })
        ).toThrow(/El producto con ID no-existe no existe en el pedido./);
    });

});