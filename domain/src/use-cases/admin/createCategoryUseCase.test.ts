import { describe, it, expect, vi } from "vitest";
import { createCategoryUseCase } from "./createCategoryUseCase";
import { CategoryService } from "../../services/category/CategoryService";

describe("ADMIN - Create category", () => {

    const mockDependencies : CategoryService = {
        save: vi.fn(),
        findById: vi.fn(),
        findAll: vi.fn(),
        delete: vi.fn()
    }

    it("deberia crear una categoria correctamente", () => {
        const categoryMock = {
            name: "Pastas",
            description: "Pastas frescas al huevo"
        }
        const response = createCategoryUseCase({ dependencies: { categoryService: mockDependencies }, payload: categoryMock })
        expect(response).toMatchObject(categoryMock)
        expect(mockDependencies.save).toHaveBeenCalledWith(response)
    })

})