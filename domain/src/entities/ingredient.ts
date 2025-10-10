import { Entity } from "../utils/types/Entity"


type UnitIngredient = 'kg' | 'g' | 'l' | 'ml' | 'unit'

export interface Ingredient extends Entity{
    name: string
    stock: number
    unit: UnitIngredient
    createdAt: Date
}
