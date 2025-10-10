import { Entity } from "../utils/types/Entity"
import { MenuStatus } from "../utils/types/menuStatus"

export interface Menu extends Entity {
    name: string
    description?: string
    isActive: MenuStatus
}
