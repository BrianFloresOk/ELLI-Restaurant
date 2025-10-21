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

type CreateCategoryData = Omit<Category, "id">


export const createCategoryUseCase = async ({ dependencies, payload }: CreateCategoryInput): Promise<CreateCategoryData> => {
    const { categoryService } = dependencies;
    const { name, description, preparationArea } = payload;

    const newCategory: CreateCategoryData = {
        name,
        description,
    }

    addPreparationArea(preparationArea, newCategory)

    await categoryService.save(newCategory);

    return newCategory
}

function addPreparationArea(preparationArea: string | undefined, newCategory: Omit<Category, "id">) {
    if (preparationArea) {
        if (preparationArea !== 'KITCHEN' && preparationArea !== 'BAR' && preparationArea !== 'PASTRY') {
            throw new Error("Área de preparación inválida. Debe ser KITCHEN, BAR o PASTRY.")
        }
        newCategory.preparationArea = preparationArea
    }
}
