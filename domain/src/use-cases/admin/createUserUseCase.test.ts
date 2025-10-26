import { describe, it, expect, vi, beforeEach } from "vitest";
import { createUserUseCase } from "./createUserUseCase";
import { UserService } from "../../services/users/UserService";
import { PasswordHasher } from "../../utils/types/PasswordHasher";
import { UserRol } from "../../utils/types/UserRol";

describe("createUserUseCase", () => {
    const mockUserService = {
        save: vi.fn(),
    } as unknown as UserService;

    const mockPasswordHasher = {
        hash: vi.fn(),
    } as unknown as PasswordHasher;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debería crear un usuario correctamente con datos válidos", async () => {
        const payload = {
            name: "Juan Pérez",
            email: "juan@mail.com",
            password: "12345",
            role: "ADMIN" as UserRol,
        };

        mockPasswordHasher.hash = vi.fn().mockResolvedValue("hashed_12345");

        const now = new Date();
        vi.setSystemTime(now);

        await createUserUseCase({
            dependencies: { userService: mockUserService, passwordHasher: mockPasswordHasher },
            payload,
        });

        expect(mockPasswordHasher.hash).toHaveBeenCalledWith("12345");
        expect(mockUserService.save).toHaveBeenCalledWith({
            name: "Juan Pérez",
            email: "juan@mail.com",
            password: "hashed_12345",
            role: "ADMIN",
            isActive: true,
            createdAt: now,
        });
    });

    it("debería lanzar un error si falta nombre, email o password", async () => {
        const payload = {
            name: "",
            email: "",
            password: "",
            role: "CASHIER" as UserRol,
        };

        await expect(
            createUserUseCase({
                dependencies: { userService: mockUserService, passwordHasher: mockPasswordHasher },
                payload,
            })
        ).rejects.toThrow("Nombre, email y contraseña son requeridos.");

        expect(mockUserService.save).not.toHaveBeenCalled();
    });

    it("debería lanzar un error si el rol es inválido", async () => {
        const payload = {
            name: "Lucía",
            email: "lucia@mail.com",
            password: "abc123",
            role: "CHEF" as UserRol,
        };

        mockPasswordHasher.hash = vi.fn().mockResolvedValue("hashed_pw");

        await expect(
            createUserUseCase({
                dependencies: { userService: mockUserService, passwordHasher: mockPasswordHasher },
                payload,
            })
        ).rejects.toThrow("Rol inválido. Debe ser ADMIN, CASHIER o WAITER.");

        expect(mockUserService.save).not.toHaveBeenCalled();
    });
});
