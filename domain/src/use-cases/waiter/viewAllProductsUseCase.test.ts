import { describe, it, expect, vi } from "vitest";
import { viewAllProductsUseCase } from "./viewAllProductsUseCase";
import { ProductService } from "../../services/product/ProductService";

describe("viewAllProductsUseCase", () => {
    it("debería retornar todos los productos llamando a productService.findAll", async () => {

        const mockProducts = [
            { id: 1, name: "Pizza", price: 12 },
            { id: 2, name: "Pasta", price: 10 },
        ];

        const mockProductService = {
            findAll: vi.fn().mockResolvedValue(mockProducts),
        } as unknown as ProductService;

        const result = await viewAllProductsUseCase({
            dependencies: { productService: mockProductService },
        });

        expect(mockProductService.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockProducts);
    });

    it("debería lanzar un error si productService.findAll falla", async () => {

        const mockProductService = {
            findAll: vi.fn().mockRejectedValue(new Error("Database error")),
        } as unknown as ProductService;

        await expect(
            viewAllProductsUseCase({
                dependencies: { productService: mockProductService },
            })
        ).rejects.toThrow("Database error");

        expect(mockProductService.findAll).toHaveBeenCalledTimes(1);
    });
});
