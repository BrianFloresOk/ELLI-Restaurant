import { describe, it, expect, vi, beforeEach } from "vitest";
import { modifyItemInOrderUseCase } from "./modifyItemInOrderUseCase";
import { Order } from "../../entities/Order";
import { Product } from "../../entities/Product";

describe("modifyItemInOrderUseCase", () => {
    let mockOrderService: any;
    let mockProductService: any;

    const order: Order = {
        id: 1,
        status: "OPEN",
        total: 0,
        tableId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as any;

    const product: Product = {
        id: 10,
        name: "Pizza",
        price: 100,
    } as any;

    beforeEach(() => {
        mockOrderService = {
            findById: vi.fn().mockResolvedValue(order),
            findItemByProduct: vi.fn(),
            addItem: vi.fn(),
            updateItemQuantity: vi.fn(),
            removeItem: vi.fn(),
        };

        mockProductService = {
            findById: vi.fn().mockResolvedValue(product),
        };
    });

    it("agrega un nuevo ítem cuando no existe y quantity > 0", async () => {
        mockOrderService.findItemByProduct.mockResolvedValue(null);

        await modifyItemInOrderUseCase({
            dependencies: { orderService: mockOrderService, productService: mockProductService },
            payload: {
                orderId: 1,
                productId: 10,
                quantity: 2,
                notes: "sin queso",
            },
        });

        expect(mockProductService.findById).toHaveBeenCalledWith(10);
        expect(mockOrderService.addItem).toHaveBeenCalledWith(1, {
            productId: 10,
            unitPrice: 100,
            quantity: 2,
            notes: "sin queso",
            status: "PENDING",
        });
    });

    it("actualiza cantidad cuando el ítem ya existe y quantity > 0", async () => {
        const existingItem = { id: 5, quantity: 1, productId: 10 };
        mockOrderService.findItemByProduct.mockResolvedValue(existingItem);

        await modifyItemInOrderUseCase({
            dependencies: { orderService: mockOrderService, productService: mockProductService },
            payload: { orderId: 1, productId: 10, quantity: 3 },
        });

        expect(mockOrderService.updateItemQuantity).toHaveBeenCalledWith({
            orderId: 1,
            itemId: 5,
            quantity: 3,
        });
    });

    it("elimina el ítem cuando existe y quantity = 0", async () => {
        const existingItem = { id: 7, productId: 10, quantity: 2 };
        mockOrderService.findItemByProduct.mockResolvedValue(existingItem);

        await modifyItemInOrderUseCase({
            dependencies: { orderService: mockOrderService, productService: mockProductService },
            payload: { orderId: 1, productId: 10, quantity: 0 },
        });

        expect(mockOrderService.removeItem).toHaveBeenCalledWith(1, 7);
        expect(mockOrderService.updateItemQuantity).not.toHaveBeenCalled();
    });

    it("no hace nada si no existe el ítem y quantity = 0", async () => {
        mockOrderService.findItemByProduct.mockResolvedValue(null);

        await modifyItemInOrderUseCase({
            dependencies: { orderService: mockOrderService, productService: mockProductService },
            payload: { orderId: 1, productId: 10, quantity: 0 },
        });

        expect(mockOrderService.addItem).not.toHaveBeenCalled();
        expect(mockOrderService.removeItem).not.toHaveBeenCalled();
    });

    it("lanza error si el pedido no está abierto", async () => {
        mockOrderService.findById.mockResolvedValue({ ...order, status: "CLOSED" });

        await expect(
            modifyItemInOrderUseCase({
                dependencies: { orderService: mockOrderService, productService: mockProductService },
                payload: { orderId: 1, productId: 10, quantity: 2 },
            })
        ).rejects.toThrow("No se puede modificar un pedido con estado CLOSED");
    });
});
