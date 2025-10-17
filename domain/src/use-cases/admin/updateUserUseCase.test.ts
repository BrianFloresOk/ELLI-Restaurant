import { describe, it, expect } from "vitest"
import { updateUserUseCase } from "./updateUserUseCase"
import { User } from "../../entities/User"

const baseUser: User = {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    password: "123456",
    role: "WAITER",
    isActive: true,
    createdAt: new Date()
}

describe("updateUserUseCase", () => {
    it("debería actualizar el nombre y email de un usuario", () => {
        const updated = updateUserUseCase({
            user: baseUser,
            name: "Juan Actualizado",
            email: "nuevo@example.com"
        })

        expect(updated.name).toBe("Juan Actualizado")
        expect(updated.email).toBe("nuevo@example.com")
        expect(updated.role).toBe("WAITER") // sin cambios
    })

    it("debería lanzar error si el usuario no existe", () => {
        expect(() =>
            updateUserUseCase({
                user: undefined as unknown as User,
                name: "Otro"
            })
        ).toThrowError("El usuario es requerido.")
    })

    it("debería lanzar error si el rol es inválido", () => {
        expect(() =>
            updateUserUseCase({
                user: baseUser,
                role: "COCINERO" as any
            })
        ).toThrowError("Rol inválido. Debe ser ADMIN, CASHIER o WAITER.")
    })
})
