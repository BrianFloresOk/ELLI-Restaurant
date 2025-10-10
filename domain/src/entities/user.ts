import { Entity } from "../utils/types/Entity"
import { UserRole } from "../utils/types/UserRol"
import { UserStatus } from "../utils/types/UserStatus"

export interface User extends Entity {
    name: string
    email: string
    password: string
    role: UserRole
    isActive: UserStatus
    createdAt: Date
}
