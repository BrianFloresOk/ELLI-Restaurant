import { Entity } from "../utils/types/Entity"

export interface Table extends Entity {
    number: number
    capacity: number
    isAvailable: boolean
    assignedWaiterId?: string 
}
