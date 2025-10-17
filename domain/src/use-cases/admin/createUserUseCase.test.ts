/* import { describe, it, expect, vi } from "vitest";
import { createUserUseCase } from "./createUserUseCase";
import { UserService } from "../../services/users/UserService";
import { UserRole } from "../../utils/types/UserRol";

describe("createUserUseCase", () => {
    const mockUserService: UserService = {
        save: vi.fn(),
        findById: vi.fn(),
        deactivate: vi.fn(),
        update: vi.fn(),
        findByRole: vi.fn(),
        findByEmail: vi.fn(),
    }

    const basePayload = {
        name: "Juan Pérez",
        email: "juan@example.com",
        password: "123456",
        role: "ADMIN" as UserRole,
    };

    it("debería crear un usuario exitosamente", () => {
        const result = createUserUseCase({
            dependencies: { userService: mockUserService },
            payload: basePayload,
        });

        expect(result).toMatchObject({
            name: "Juan Pérez",
            email: "juan@example.com",
            role: "ADMIN",
            isActive: "ACTIVE",
        });
        expect(result.id).toBeDefined();
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(mockUserService.save).toHaveBeenCalledWith(result);
    });

    it("debería lanzar un error si falta algún campo requerido", () => {
        expect(() =>
            createUserUseCase({
                dependencies: { userService: mockUserService },
                payload: { ...basePayload, name: "" },
            })
        ).toThrow("Nombre, email y contraseña son requeridos.");

        expect(() =>
            createUserUseCase({
                dependencies: { userService: mockUserService },
                payload: { ...basePayload, email: "" },
            })
        ).toThrow("Nombre, email y contraseña son requeridos.");

        expect(() =>
            createUserUseCase({
                dependencies: { userService: mockUserService },
                payload: { ...basePayload, password: "" },
            })
        ).toThrow("Nombre, email y contraseña son requeridos.");
    });

    it("debería lanzar un error si el rol es inválido", () => {
        expect(() =>
            createUserUseCase({
                dependencies: { userService: mockUserService },
                payload: { ...basePayload, role: "COCINERO" as UserRole },
            })
        ).toThrow("Rol inválido. Debe ser ADMIN, CASHIER o WAITER.");
    });
});
 */