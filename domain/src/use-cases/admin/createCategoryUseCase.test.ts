import { describe, it, expect } from "vitest";
import { createCategoryUseCase } from "./createCategoryUseCase";

describe("ADMIN - Create category", () => {
    it("deberia crear una categoria correctamente", () => {
        const categoryMock = {
            name: "Pastas",
            description: "Pastas frescas al huevo"
        }
        const response = createCategoryUseCase(categoryMock)

        expect(response.name).toBe(categoryMock.name)
        expect(response.description).toBe(categoryMock.description)
    })

})