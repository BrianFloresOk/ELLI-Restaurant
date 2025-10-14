import { User } from "../../entities/User"
import { UserRole } from "../../utils/types/UserRol"

interface UpdateUserInput {
    user: User
    name?: string
    email?: string
    password?: string
    role?: UserRole
}

export function updateUserUseCase(input: UpdateUserInput): User {
    const { user, name, email, password, role } = input

    if (!user) {
        throw new Error("El usuario es requerido.")
    }

    const updatedUser: User = { ...user }

    if (name) updatedUser.name = name
    if (email) updatedUser.email = email.toLowerCase()
    if (password) updatedUser.password = password
    if (role) {
        const validRoles: UserRole[] = ["ADMIN", "CASHIER", "WAITER"]
        if (!validRoles.includes(role)) {
            throw new Error("Rol inválido. Debe ser ADMIN, CASHIER o WAITER.")
        }
        updatedUser.role = role
    }

    return updatedUser
}
