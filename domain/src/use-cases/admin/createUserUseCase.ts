import { User } from "../../entities/User"
import { UserService } from "../../services/users/UserService"
import { PasswordHasher } from "../../utils/types/PasswordHasher"
import { UserRole } from "../../utils/types/UserRol"


interface Dependencies {
    userService: UserService,
    passwordHasher: PasswordHasher,
}
interface CreateUserInput {
    dependencies: Dependencies
    payload: {
        name: string
        email: string
        password: string
        role: UserRole
    }
}


export async function createUserUseCase({ dependencies, payload }: CreateUserInput): Promise<User> {
    const { name, email, password, role } = payload
    const { userService, passwordHasher } = dependencies

    if (!name || !email || !password) {
        throw new Error("Nombre, email y contraseña son requeridos.")
    }

    const passwordHashed = await passwordHasher.hash(payload.password);

    validateRole(role)

    const user: User = {
        id: crypto.randomUUID(),
        name,
        email: email.toLowerCase(),
        password: passwordHashed,
        role,
        isActive: true,
        createdAt: new Date()
    }

    userService.save(user)
    return user
}

function validateRole(role: UserRole) {
    const validRoles: UserRole[] = ["ADMIN", "CASHIER", "WAITER"]
    if (!validRoles.includes(role)) {
        throw new Error("Rol inválido. Debe ser ADMIN, CASHIER o WAITER.")
    }
}