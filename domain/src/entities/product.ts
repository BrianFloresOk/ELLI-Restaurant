import { Entity } from "../utils/types/Entity"
import { ProductType } from "../utils/types/ProductType"


export interface Product extends Entity{
    name: string
    description?: string
    price: number
    type: ProductType
    categoryId: string
    createdAt: Date
}
