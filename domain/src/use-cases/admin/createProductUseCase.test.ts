import { describe, it, expect, vi } from "vitest";
import { createProductUseCase } from "./createProductUseCase";
import { ProductService } from "../../services/product/ProductService";
import { ProductType } from "../../utils/types/ProductType";


describe("createProductUseCase", () => {
    const mockProductService : ProductService = {
        save: vi.fn(),
        findById: vi.fn(),
        findAll: vi.fn(),
        delete: vi.fn()
    }

    const basePayload = {
        name: "Pizza Margarita",
        description: "Deliciosa pizza con tomate, mozzarella y albahaca",
        price: 8.99,
        type: "DISH" as ProductType,
        categoryId: 12345,
    };
    it("debería crear un producto exitosamente", () => {
        const result = createProductUseCase({
            dependencies: { productService: mockProductService },
            payload: basePayload,
        });
        expect(result).toMatchObject({
            name: "Pizza Margarita",
            description: "Deliciosa pizza con tomate, mozzarella y albahaca",
            price: 8.99,
            type: "DISH",
            categoryId: "12345",
        });
        expect(result.id).toBeDefined();
        expect(mockProductService.save).toHaveBeenCalledWith(result);
    });

});