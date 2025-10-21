import { Product } from "../../entities/Product"
import { ProductService } from "../../services/product/ProductService"
import { ProductType } from "../../utils/types/ProductType"

interface Payload {
    name: string
    description?: string
    price: number
    type: ProductType
    categoryId: number,
    stock?: number
}
interface Dependencies {
    productService: ProductService
}
interface CreateProductInput {
    dependencies: Dependencies
    payload: Payload
}

type ProductCreateData = Omit<Product, "id">

export const createProductUseCase = async ({ dependencies, payload }: CreateProductInput): Promise<void> => {
    const { productService } = dependencies

    
    const newProduct: ProductCreateData = {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        type: payload.type,
        categoryId: payload.categoryId,
        stock: payload.stock || 0,
    }

    await productService.save(newProduct)
}