import { User } from "../../entities/User";
import { UserService } from "../../services/users/UserService";

interface Dependencies {
    userService: UserService
}

interface LoginInput {
    dependencies: Dependencies,
    payload: {
        email: string,
        password: string
    }
}

export async function loginUseCase({ dependencies, payload}: LoginInput): Promise<User | null> {
    const { email, password } = payload
    const { userService } = dependencies;
    const user = await userService.findByEmail(email)

    if(!user) {
        throw new Error("Credenciales invalidas")
    }

    if(user.password !== password) {
        throw new Error("Credenciales invalidas")
    }

    return user
}