import { describe, it, expect, vi } from "vitest";
import { Product } from "../../entities/Product";
import { createOrderUseCase } from "./createOrderUseCase";
import { addItemToOrderUseCase } from "./addItemToOrderUseCase";
import { Order } from "../../entities/Order";

describe("addItemToOrderUseCase (con dependencias)", () => {
    const mockProduct1: Product = {
        id: "p1",
        name: "Pizza Margarita",
        price: 2000,
        type: "DISH",
        categoryId: "1"
    };

    const mockProduct2: Product = {
        id: "p2",
        name: "Empanada de carne",
        price: 800,
        type: "DISH",
        categoryId: "2"
    };

    // 📦 Mock del servicio de órdenes
    const mockOrderService = {
        update: vi.fn().mockResolvedValue(undefined),
        findById: vi.fn(),
        save: vi.fn(),
        delete: vi.fn(),
        list: vi.fn(),
        findByStatus: vi.fn()
    };

    it("agrega un producto nuevo a la orden y persiste los cambios", async () => {
        const order: Order = await createOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: {
                tableId: "mesa-1",
                waiterId: "waiter-1",
                items: [
                    { product: mockProduct1, quantity: 1 },
                    { product: mockProduct2, quantity: 2 }
                ],
            }
        });

        const updatedOrder = await addItemToOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: { order, product: mockProduct2, quantity: 3 },
        });

        expect(updatedOrder.items).toHaveLength(2);
        expect(updatedOrder.total).toBe(2000 + (5 * 800));
        expect(updatedOrder.status).toBe("OPEN");
        expect(mockOrderService.update).toHaveBeenCalledOnce();
    });

    it("incrementa la cantidad si el producto ya está en la orden", async () => {

        const order = await createOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: {
                tableId: "mesa-1",
                waiterId: "waiter-1",
                items: [{ product: mockProduct1, quantity: 1 }],
            },
        });

        const updatedOrder = await addItemToOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: { order, product: mockProduct1, quantity: 2 },
        });

        expect(updatedOrder.items[0].quantity).toBe(3);
        expect(updatedOrder.total).toBe(3 * 2000);
    });

    it("lanza error si la cantidad es inválida", async () => {
        const order = await createOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: {
                tableId: "mesa-1",
                waiterId: "waiter-1",
                items: [{ product: mockProduct1, quantity: 1 }],
            },
        });

        await expect(
            addItemToOrderUseCase({
                dependencies: { orderService: mockOrderService },
                payload: { order, product: mockProduct2, quantity: 0 },
            })
        ).rejects.toThrow("La cantidad debe ser mayor que cero.");
    });

    it("no permite modificar pedidos cerrados", async () => {
        const order2 = await createOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: {
                tableId: "mesa-1",
                waiterId: "waiter-1",
                items: [{ product: mockProduct1, quantity: 1 }],
            },
        });
        order2.status = "CLOSED";

        await expect(
            addItemToOrderUseCase({
                dependencies: { orderService: mockOrderService },
                payload: { order: order2, product: mockProduct2, quantity: 1 },
            })
        ).rejects.toThrow(/No se puede modificar un pedido/);
    });
});
