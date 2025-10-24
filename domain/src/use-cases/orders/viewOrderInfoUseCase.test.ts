import { describe, it, expect, vi, beforeEach } from "vitest";
import { viewOrderInfoUseCase } from "./viewOrderInfoUseCase";
import { ProductService, UserService, OrderService } from "../../services";


describe("viewOrderInfoUseCase", () => {
    const mockOrderService = {
        findById: vi.fn(),
    } as unknown as OrderService;

    const mockUserService = {
        findById: vi.fn(),
    } as unknown as UserService;

    const mockProductService = {
        findById: vi.fn(),
    } as unknown as ProductService;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debería devolver la información detallada de un pedido correctamente", async () => {
        const orderDate = new Date("2025-10-20T10:00:00Z");

        const mockOrder = {
            id: 1,
            tableId: 5,
            waiterId: 10,
            status: "OPEN",
            orderDate,
            orderItems: [
                { productId: 101, quantity: 2, subTotal: 200 },
                { productId: 102, quantity: 1, subTotal: 100 },
            ],
        };

        const mockUser = { id: 10, name: "Juan Pérez" };
        const mockProduct1 = { id: 101, name: "Pizza Margarita", price: 100 };
        const mockProduct2 = { id: 102, name: "Cerveza Rubia", price: 50 };

        mockOrderService.findById = vi.fn().mockResolvedValue(mockOrder);
        mockUserService.findById = vi.fn().mockResolvedValue(mockUser);
        mockProductService.findById = vi
            .fn()
            .mockImplementation((id) =>
                id === 101 ? Promise.resolve(mockProduct1) : Promise.resolve(mockProduct2)
            );

        const result = await viewOrderInfoUseCase({
            dependencies: {
                orderService: mockOrderService,
                userService: mockUserService,
                productService: mockProductService,
            },
            orderId: 1,
        });

        expect(mockOrderService.findById).toHaveBeenCalledWith(1);
        expect(mockUserService.findById).toHaveBeenCalledWith(10);
        expect(mockProductService.findById).toHaveBeenCalledTimes(2);

        expect(result).toEqual({
            orderNumber: 1,
            tableId: 5,
            waiter: "Juan Pérez",
            status: "OPEN",
            orderDate,
            orderItems: [
                { product: "Pizza Margarita", quantity: 2, subtotal: 200 },
                { product: "Cerveza Rubia", quantity: 1, subtotal: 50 },
            ],
        });
    });

    it("debería lanzar un error si el pedido no existe", async () => {
        mockOrderService.findById = vi.fn().mockResolvedValue(null);

        await expect(
            viewOrderInfoUseCase({
                dependencies: {
                    orderService: mockOrderService,
                    userService: mockUserService,
                    productService: mockProductService,
                },
                orderId: 99,
            })
        ).rejects.toThrow("El pedido con ID 99 no existe.");
    });

    it("debería manejar productos o mozo desconocidos", async () => {
        const orderDate = new Date();

        const mockOrder = {
            id: 2,
            tableId: 3,
            waiterId: 7,
            status: "CLOSED",
            orderDate,
            orderItems: [{ productId: 999, quantity: 5, subTotal: 0 }],
        };

        mockOrderService.findById = vi.fn().mockResolvedValue(mockOrder);
        mockUserService.findById = vi.fn().mockResolvedValue(null);
        mockProductService.findById = vi.fn().mockResolvedValue(null);

        const result = await viewOrderInfoUseCase({
            dependencies: {
                orderService: mockOrderService,
                userService: mockUserService,
                productService: mockProductService,
            },
            orderId: 2,
        });

        expect(result).toEqual({
            orderNumber: 2,
            tableId: 3,
            waiter: "Desconocido",
            status: "CLOSED",
            orderDate,
            orderItems: [{ product: "Producto desconocido", quantity: 5, subtotal: 0 }],
        });
    });
});
