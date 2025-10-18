import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginUseCase } from "./loginUseCase";
import { UserService } from "../../services/users/UserService";
import { PasswordHasher, TokenGenerator } from "domain/src/utils/types";
import { User } from "../../entities/User";

describe("loginUseCase", () => {
    let mockUserService: UserService;
    let mockPasswordHasher: PasswordHasher;
    let mockTokenGenerator: TokenGenerator;
    let mockUser: User;

    beforeEach(() => {
        mockUser = {
            id: "user-123",
            name: "John Doe",
            email: "john@example.com",
            password: "hashed-password",
            role: "ADMIN",
            isActive: true,
            createdAt: new Date(),
        };

        mockUserService = {
            findByEmail: vi.fn(),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            list: vi.fn(),
        } as any;

        mockPasswordHasher = {
            compare: vi.fn(),
            hash: vi.fn(),
        };

        mockTokenGenerator = {
            generate: vi.fn(),
            verify: vi.fn(),
        };
    });

    it("debería retornar un token válido si el login es correcto", async () => {
        (mockUserService.findByEmail as any).mockResolvedValue(mockUser);
        (mockPasswordHasher.compare as any).mockResolvedValue(true);
        (mockTokenGenerator.generate as any).mockResolvedValue("token-123");

        const result = await loginUseCase({
            dependencies: {
                userService: mockUserService,
                passwordHasher: mockPasswordHasher,
                tokenGenerator: mockTokenGenerator,
            },
            payload: { email: mockUser.email, password: "123456" },
        });

        expect(result).toEqual({ token: "token-123" });
        expect(mockUserService.findByEmail).toHaveBeenCalledWith(mockUser.email);
        expect(mockPasswordHasher.compare).toHaveBeenCalledWith("123456", mockUser.password);
        expect(mockTokenGenerator.generate).toHaveBeenCalledWith({
            id: mockUser.id,
            email: mockUser.email,
            role: mockUser.role,
        });
    });

    it("debería lanzar error si el usuario no existe", async () => {
        (mockUserService.findByEmail as any).mockResolvedValue(null);

        await expect(
            loginUseCase({
                dependencies: {
                    userService: mockUserService,
                    passwordHasher: mockPasswordHasher,
                    tokenGenerator: mockTokenGenerator,
                },
                payload: { email: "nonexistent@example.com", password: "123456" },
            }),
        ).rejects.toThrow("Account not found.");
    });

    it("debería lanzar error si la contraseña es incorrecta", async () => {
        (mockUserService.findByEmail as any).mockResolvedValue(mockUser);
        (mockPasswordHasher.compare as any).mockResolvedValue(false);

        await expect(
            loginUseCase({
                dependencies: {
                    userService: mockUserService,
                    passwordHasher: mockPasswordHasher,
                    tokenGenerator: mockTokenGenerator,
                },
                payload: { email: mockUser.email, password: "wrong-password" },
            }),
        ).rejects.toThrow("Invalid credentials.");
    });
});
