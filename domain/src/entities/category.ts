import { Entity } from "../utils/types/Entity"

export interface Category extends Entity {
    name: string
    description?: string
    preparationArea?: 'KITCHEN' | 'BAR' | 'PASTRY';
}