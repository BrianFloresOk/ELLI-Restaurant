import { Entity } from "../utils/types/Entity"
import { UserRole } from "../utils/types/userRol"
import { UserStatus } from "../utils/types/userStatus"

export interface User extends Entity {
    name: string
    email: string
    password: string
    role: UserRole
    isActive: UserStatus
    createdAt: Date
}
