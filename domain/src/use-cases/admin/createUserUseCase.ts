import { User } from "../../entities/User"
import { UserRole } from "../../utils/types/UserRol"

interface CreateUserInput {
    name: string
    email: string
    password: string
    role: UserRole
}

export function createUserUseCase(input: CreateUserInput): User {
    const { name, email, password, role } = input

    if (!name || !email || !password) {
        throw new Error("Nombre, email y contraseña son requeridos.")
    }

    const validRoles: UserRole[] = ["ADMIN", "CASHIER", "WAITER"]
    if (!validRoles.includes(role)) {
        throw new Error("Rol inválido. Debe ser ADMIN, CASHIER o WAITER.")
    }

    const user: User = {
        id: crypto.randomUUID(),
        name,
        email: email.toLowerCase(),
        password,
        role,
        isActive: "ACTIVE",
        createdAt: new Date()
    }

    return user
}