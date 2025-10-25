import { describe, it, expect } from "vitest";
import { viewCategoriesUseCase } from "./viewCategoriesUseCase";
import { CategoryService } from "domain/src/services";

describe("viewCategoriesUseCase", () => {
    it("debería estar definida", () => {
        expect(viewCategoriesUseCase).toBeDefined();
    });

    it("debería retornar una lista de categorías", async () => {
        const mockCategories = [
            { id: 1, name: "Bebidas" },
            { id: 2, name: "Comidas" },
        ];
        const mockCategoryService = {
            findAll: () => Promise.resolve(mockCategories),
        };
        const dependencies = { categoryService: mockCategoryService as CategoryService };

        const categories = await viewCategoriesUseCase(dependencies);
        expect(categories).toEqual(mockCategories);
    });
});