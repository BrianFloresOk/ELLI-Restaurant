import { PasswordHasher, TokenGenerator } from "../../utils/types";
import { User } from "../../entities/User";
import { UserService } from "../../services/users/UserService";

interface Dependencies {
    userService: UserService,
    passwordHasher: PasswordHasher,
    tokenGenerator: TokenGenerator
}

interface LoginInput {
    dependencies: Dependencies,
    payload: {
        email: string,
        password: string
    }
}

interface Token {
    accessToken: string;
    refreshToken: string;
}

interface PayloadToken {
    id: number;
    email: string;
    role: string;
}

export async function loginUseCase({ dependencies, payload }: LoginInput): Promise<Token> {
    const { email, password } = payload
    const { userService, passwordHasher, tokenGenerator } = dependencies;
    const user = await userService.findByEmail(email)

    if (!user) {
        throw new Error("Account not found.")
    }

    await validatePassword(passwordHasher, password, user);

    const payloadToken: PayloadToken = {
        id: user.id,
        email: user.email,
        role: user.role
    }

    const token = await generateToken(payloadToken, tokenGenerator);
    return token;
}


async function validatePassword(passwordHasher: PasswordHasher, password: string, user: User) {
    const isPasswordValid = await passwordHasher.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid credentials.");
    }
}

async function generateToken(payloadToken: PayloadToken, tokenGenerator: TokenGenerator) {
    const accessToken = await tokenGenerator.generate(payloadToken);
    const refreshToken = await tokenGenerator.generateRefresh(payloadToken);
    return { accessToken, refreshToken };
}