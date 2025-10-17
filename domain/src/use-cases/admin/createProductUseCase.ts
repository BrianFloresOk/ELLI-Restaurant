import { Product } from "../../entities/Product"
import { ProductService } from "../../services/product/ProductService"
import { ProductType } from "../../utils/types/ProductType"

interface Payload {
    name: string
    description?: string
    price: number
    type: ProductType
    categoryId: number
}
interface Dependencies {
    productService: ProductService
}

interface CreateProductInput {
    dependencies: Dependencies
    payload: Payload
}

export const createProductUseCase = ({ dependencies, payload }: CreateProductInput): Product => {
    const newProduct: Product = {
        id: crypto.randomUUID(),
        name: payload.name,
        description: payload.description,
        price: payload.price,
        type: payload.type,
        categoryId: payload.categoryId
    }

    dependencies.productService.save(newProduct)
    return newProduct;
}