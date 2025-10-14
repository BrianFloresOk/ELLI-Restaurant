import { Category } from "../../entities/Category"

interface Payload {
    name: string
    description?: string
    preparationArea?: string
}

export const createCategoryUseCase = ({ name, description, preparationArea }: Payload): Category => {
    const newCategory: Category = {
        id: crypto.randomUUID(),
        name,
        description,
    }

    return newCategory
}