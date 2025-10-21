import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginUseCase } from "./loginUseCase";
import { UserService } from "../../services/users/UserService";
import { PasswordHasher, TokenGenerator } from "domain/src/utils/types";
import { User } from "../../entities/User";

describe("loginUseCase", () => {
    const mockUserService = {
        findByEmail: vi.fn(),
    } as unknown as UserService;

    const mockPasswordHasher = {
        compare: vi.fn(),
    } as unknown as PasswordHasher;

    const mockTokenGenerator = {
        generate: vi.fn(),
    } as unknown as TokenGenerator;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debería retornar un token si el login es exitoso", async () => {
        const user: User = {
            id: 1,
            name: "Ana Gómez",
            email: "ana@mail.com",
            password: "hashed_password",
            role: "ADMIN",
            isActive: true,
            createdAt: new Date(),
        };

        mockUserService.findByEmail = vi.fn().mockResolvedValue(user);
        mockPasswordHasher.compare = vi.fn().mockResolvedValue(true);
        mockTokenGenerator.generate = vi.fn().mockResolvedValue("jwt_token_value");

        const result = await loginUseCase({
            dependencies: {
                userService: mockUserService,
                passwordHasher: mockPasswordHasher,
                tokenGenerator: mockTokenGenerator,
            },
            payload: {
                email: "ana@mail.com",
                password: "12345",
            },
        });

        expect(mockUserService.findByEmail).toHaveBeenCalledWith("ana@mail.com");
        expect(mockPasswordHasher.compare).toHaveBeenCalledWith("12345", "hashed_password");
        expect(mockTokenGenerator.generate).toHaveBeenCalledWith({
            id: 1,
            email: "ana@mail.com",
            role: "ADMIN",
        });
        expect(result).toEqual({ token: "jwt_token_value" });
    });

    it("debería lanzar error si la cuenta no existe", async () => {
        mockUserService.findByEmail = vi.fn().mockResolvedValue(null);

        await expect(
            loginUseCase({
                dependencies: {
                    userService: mockUserService,
                    passwordHasher: mockPasswordHasher,
                    tokenGenerator: mockTokenGenerator,
                },
                payload: { email: "notfound@mail.com", password: "1234" },
            })
        ).rejects.toThrow("Account not found.");

        expect(mockPasswordHasher.compare).not.toHaveBeenCalled();
        expect(mockTokenGenerator.generate).not.toHaveBeenCalled();
    });

    it("debería lanzar error si la contraseña es inválida", async () => {
        const user: User = {
            id: 2,
            name: "Carlos",
            email: "carlos@mail.com",
            password: "hashed_pw",
            role: "CASHIER",
            isActive: true,
            createdAt: new Date(),
        };

        mockUserService.findByEmail = vi.fn().mockResolvedValue(user);
        mockPasswordHasher.compare = vi.fn().mockResolvedValue(false);

        await expect(
            loginUseCase({
                dependencies: {
                    userService: mockUserService,
                    passwordHasher: mockPasswordHasher,
                    tokenGenerator: mockTokenGenerator,
                },
                payload: { email: "carlos@mail.com", password: "wrong_pw" },
            })
        ).rejects.toThrow("Invalid credentials.");

        expect(mockTokenGenerator.generate).not.toHaveBeenCalled();
    });
});
