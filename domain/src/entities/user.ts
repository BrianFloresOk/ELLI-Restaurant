import { Entity } from "../utils/types/Entity"
import { UserRol } from "../utils/types/UserRol"

export interface User extends Entity {
    name: string
    email: string
    password: string
    role: UserRol
    isActive: boolean
    createdAt: Date
}