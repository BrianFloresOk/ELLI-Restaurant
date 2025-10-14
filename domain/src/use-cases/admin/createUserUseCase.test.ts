import { describe, it, expect } from "vitest"
import { createUserUseCase } from "./createUserUseCase"
import { UserRole } from "../../utils/types/UserRol"

describe("createUserUseCase", () => {
    it("debería crear un usuario válido", () => {
        const user = createUserUseCase({
            name: "Juan Pérez",
            email: "juan@example.com",
            password: "123456",
            role: "WAITER"
        })

        expect(user).toHaveProperty("id")
        expect(user.email).toBe("juan@example.com")
        expect(user.role).toBe("WAITER")
        expect(user.isActive).toBe("ACTIVE")
    })

    it("debería lanzar error si falta un campo obligatorio", () => {
        expect(() =>
            createUserUseCase({
                name: "",
                email: "juan@example.com",
                password: "123456",
                role: "WAITER"
            })
        ).toThrowError("Nombre, email y contraseña son requeridos.")
    })

    it("debería lanzar error si el rol es inválido", () => {
        expect(() =>
            createUserUseCase({
                name: "Juan",
                email: "juan@example.com",
                password: "123456",
                role: "CHEF" as UserRole
            })
        ).toThrowError("Rol inválido. Debe ser ADMIN, CASHIER o WAITER.")
    })
})
