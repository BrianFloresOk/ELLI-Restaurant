import { Entity } from "../utils/types/Entity"

export interface MenuSection extends Entity {
    name: string
    description?: string
    menuId: string 
    orderVisualization: number 
}
