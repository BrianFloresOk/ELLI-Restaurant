import { Entity } from "../utils/types/Entity"

export type Area = 'KITCHEN' | 'BAR' | 'PASTRY';

export interface Category extends Entity {
    name: string
    description?: string
    preparationArea?: Area;
}