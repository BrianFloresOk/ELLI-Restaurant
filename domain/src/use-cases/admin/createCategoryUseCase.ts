import { Category } from "../../entities/Category"
import { CategoryService } from "../../services/category/CategoryService"

interface Payload {
    name: string
    description?: string
    preparationArea?: string
}
interface Dependencies {
    categoryService: CategoryService,
}

interface CreateCategoryInput {
    dependencies: Dependencies,
    payload: Payload
}


export const createCategoryUseCase = ({ dependencies, payload }: CreateCategoryInput): Category => {
    const { categoryService } = dependencies;
    const { name, description, preparationArea } = payload;

    const newCategory: Category = {
        id: crypto.randomUUID(),
        name,
        description,
    }

    addPreparationArea(preparationArea, newCategory)

    categoryService.save(newCategory);

    return newCategory
}

function addPreparationArea(preparationArea: string | undefined, newCategory: Category) {
    if (preparationArea) {
        if (preparationArea !== 'KITCHEN' && preparationArea !== 'BAR' && preparationArea !== 'PASTRY') {
            throw new Error("Área de preparación inválida. Debe ser KITCHEN, BAR o PASTRY.")
        }
        newCategory.preparationArea = preparationArea
    }
}
