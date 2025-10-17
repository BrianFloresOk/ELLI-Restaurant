import { Entity } from "../utils/types/Entity"
import { UserRole } from "../utils/types/UserRol"

export interface User extends Entity {
    name: string
    email: string
    password: string
    role: UserRole
    isActive: boolean
    createdAt: Date
}