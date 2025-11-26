import { User } from "../../entities/User"
import { UserService } from "../../services/users/UserService"
import { PasswordHasher } from "../../utils/types/PasswordHasher"
import { UserRol } from "../../utils/types/UserRol"


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
        role: UserRol
    }
}

type UserCreateData = Omit<User, "id">


export async function createUserUseCase({ dependencies, payload }: CreateUserInput): Promise<void> {
    const { name, email, password, role } = payload
    const { userService, passwordHasher } = dependencies

    if (!name || !email || !password) {
        throw new Error("Nombre, email y contraseña son requeridos.")
    }

    const passwordHashed = await passwordHasher.hash(payload.password);

    validateRole(role)

    const user: UserCreateData = {
        name,
        email: email,
        password: passwordHashed,
        role,
        isActive: true,
        createdAt: new Date()
    }

    userService.save(user)
}

function validateRole(role: UserRol) {
    const validRoles: UserRol[] = ["ADMIN", "CASHIER", "WAITER"]
    if (!validRoles.includes(role)) {
        throw new Error("Rol inválido. Debe ser ADMIN, CASHIER o WAITER.")
    }
}