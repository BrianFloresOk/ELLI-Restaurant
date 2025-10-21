import { describe, it, expect, vi } from "vitest";
import { createCategoryUseCase } from "./createCategoryUseCase";
import { CategoryService } from "../../services/category/CategoryService";
import { Category } from "../../entities/Category";

describe("createCategoryUseCase", () => {
    const mockCategoryService = {
        save: vi.fn(),
    } as Partial<CategoryService> as CategoryService;

    it("debería crear una categoría sin preparationArea", async () => {
        const payload = {
            name: "Bebidas",
            description: "Categoría de bebidas frías y calientes",
        };

        const result = await createCategoryUseCase({
            dependencies: { categoryService: mockCategoryService },
            payload,
        });

        expect(result).toEqual(payload);
        expect(mockCategoryService.save).toHaveBeenCalledWith(payload);
    });

    it("debería crear una categoría con preparationArea válida", async () => {
        const payload = {
            name: "Postres",
            description: "Categoría de postres dulces",
            preparationArea: "PASTRY",
        };

        const expected: Omit<Category, "id"> = {
            name: "Postres",
            description: "Categoría de postres dulces",
            preparationArea: "PASTRY",
        };

        const result = await createCategoryUseCase({
            dependencies: { categoryService: mockCategoryService },
            payload,
        });

        expect(result).toEqual(expected);
        expect(mockCategoryService.save).toHaveBeenCalledWith(expected);
    });
});
