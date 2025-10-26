import { describe, it, expect, vi } from "vitest";
import { activateUserUseCase } from "./activateUserUseCase";
import { UserService } from "../../services/users/UserService";

describe("activateUserUseCase", () => {
    it("debería activar un usuario existente", async () => {
        const mockUser = { id: 1, name: "Juan Pérez", isActive: false };

        const userService: Partial<UserService> = {
            findById: vi.fn().mockResolvedValue(mockUser),
            activate: vi.fn().mockResolvedValue(undefined),
        };

        await activateUserUseCase({
            payload: { userId: 1 },
            dependencies: { userService: userService as UserService },
        });

        expect(userService.findById).toHaveBeenCalledWith(1);
        expect(userService.activate).toHaveBeenCalledWith(1);
        expect(userService.activate).toHaveBeenCalledTimes(1);
    });

    it("debería lanzar un error si el usuario no existe", async () => {
        const userService: Partial<UserService> = {
            findById: vi.fn().mockResolvedValue(null),
            deactivate: vi.fn(),
        };

        await expect(
            activateUserUseCase({
                payload: { userId: 999 },
                dependencies: { userService: userService as UserService },
            })
        ).rejects.toThrow("User not found");

        expect(userService.findById).toHaveBeenCalledWith(999);
        expect(userService.deactivate).not.toHaveBeenCalled();
    });
});
