/* export interface Product extends Entity {
    name: string
    description?: string
    price: number
    type: ProductType
    categoryId: string
}
 */

import { Product } from "../../entities/Product"
import { ProductType } from "../../utils/types/ProductType"

interface Payload {
    name: string
    description?: string
    price: number
    type: ProductType
    categoryId: string
}

export const createProductUseCase = (payload: Payload) => {
    const newProduct: Product = {
        id: crypto.randomUUID(),
        name: payload.name,
        description: payload.description,
        price: payload.price,
        type: payload.type,
        categoryId: payload.categoryId
    }

    return newProduct;
}