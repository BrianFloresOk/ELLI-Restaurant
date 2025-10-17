import { describe, it, expect, vi, beforeEach } from "vitest";
import { addItemToOrderUseCase } from "./addItemToOrderUseCase";
import { OrderService } from "../../../src/services/orders/OrderService";
import { Order } from "../../../src/entities/Order";
import { Product } from "../../../src/entities/Product";
import { OrderItem } from "../../../src/entities/OrderItem";

describe("addItemToOrderUseCase", () => {
    let mockOrderService: OrderService;
    let mockOrder: Order;
    let mockProduct: Product;
    let existingItem: OrderItem;

    beforeEach(() => {
        mockOrderService = {
            findById: vi.fn(),
            list: vi.fn(),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            closeOrder: vi.fn(),
            findByStatus: vi.fn(),
            findByTableId: vi.fn(),
            addItem: vi.fn(),
            updateItem: vi.fn(),
            removeItem: vi.fn(),
            listItems: vi.fn(),
        };

        mockOrder = {
            id: "order-123",
            tableId: "table-1",
            waiterId: "waiter-1",
            status: "OPEN",
            orderDate: new Date(),
        };

        mockProduct = {
            id: "product-1",
            name: "Pizza Margarita",
            price: 10,
            type: "DISH",
            categoryId: "cat-1",
            description: "Delicious pizza",
            stock: 20,
        };

        existingItem = {
            id: "item-1",
            orderId: mockOrder.id,
            productId: mockProduct.id,
            quantity: 1,
            unitPrice: 10,
            subtotal: 10,
            status: "PENDING",
        };
    });

    it("debería agregar un nuevo item si no existe en la orden", async () => {
        (mockOrderService.findById as any).mockResolvedValue(mockOrder);
        (mockOrderService.listItems as any).mockResolvedValue([]);

        await addItemToOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: {
                orderId: mockOrder.id,
                product: mockProduct,
                quantity: 2,
            },
        });

        expect(mockOrderService.addItem).toHaveBeenCalledTimes(1);
        const [orderId, newItem] = (mockOrderService.addItem as any).mock.calls[0];
        expect(orderId).toBe(mockOrder.id);
        expect(newItem.productId).toBe(mockProduct.id);
        expect(newItem.subtotal).toBe(20);
    });

    it("debería actualizar cantidad si el item ya existe", async () => {
        (mockOrderService.findById as any).mockResolvedValue(mockOrder);
        (mockOrderService.listItems as any).mockResolvedValue([existingItem]);

        await addItemToOrderUseCase({
            dependencies: { orderService: mockOrderService },
            payload: {
                orderId: mockOrder.id,
                product: mockProduct,
                quantity: 2,
            },
        });

        expect(mockOrderService.updateItem).toHaveBeenCalledTimes(1);
        const updatePayload = (mockOrderService.updateItem as any).mock.calls[0][0];
        expect(updatePayload.data.quantity).toBe(3);
        expect(updatePayload.data.subtotal).toBe(30);
    });

    it("debería lanzar error si la orden no está abierta", async () => {
        (mockOrderService.findById as any).mockResolvedValue({
            ...mockOrder,
            status: "CLOSED",
        });
        (mockOrderService.listItems as any).mockResolvedValue([]);

        await expect(
            addItemToOrderUseCase({
                dependencies: { orderService: mockOrderService },
                payload: {
                    orderId: mockOrder.id,
                    product: mockProduct,
                    quantity: 1,
                },
            }),
        ).rejects.toThrow("No se puede modificar un pedido con estado CLOSED");
    });

    it("debería lanzar error si el producto es inválido", async () => {
        await expect(
            addItemToOrderUseCase({
                dependencies: { orderService: mockOrderService },
                payload: {
                    orderId: mockOrder.id,
                    // @ts-expect-error producto inválido
                    product: null,
                    quantity: 1,
                },
            }),
        ).rejects.toThrow("Producto inválido.");
    });

    it("debería lanzar error si la cantidad es menor o igual a cero", async () => {
        await expect(
            addItemToOrderUseCase({
                dependencies: { orderService: mockOrderService },
                payload: {
                    orderId: mockOrder.id,
                    product: mockProduct,
                    quantity: 0,
                },
            }),
        ).rejects.toThrow("La cantidad debe ser mayor a cero.");
    });
});
