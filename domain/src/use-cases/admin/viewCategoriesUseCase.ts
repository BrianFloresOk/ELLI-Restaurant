import { CategoryService } from "domain/src/services";

export interface Dependencies {
    categoryService: CategoryService;
}

export async function viewCategoriesUseCase(dependencies: Dependencies) {
    const categories = await dependencies.categoryService.findAll();
    return categories;
}