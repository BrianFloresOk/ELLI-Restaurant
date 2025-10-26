import { describe, it, expect, vi } from "vitest";
import { deactivateUserUseCase } from "./deactivateUserUseCase";
import { UserService } from "../../services/users/UserService";

describe("deactivateUserUseCase", () => {
    it("debería desactivar un usuario existente", async () => {
        const mockUser = { id: 1, name: "Juan Pérez", isActive: true };

        const userService: Partial<UserService> = {
            findById: vi.fn().mockResolvedValue(mockUser),
            deactivate: vi.fn().mockResolvedValue(undefined),
        };

        await deactivateUserUseCase({
            payload: { userId: 1 },
            dependencies: { userService: userService as UserService },
        });

        expect(userService.findById).toHaveBeenCalledWith(1);
        expect(userService.deactivate).toHaveBeenCalledWith(1);
        expect(userService.deactivate).toHaveBeenCalledTimes(1);
    });

    it("debería lanzar un error si el usuario no existe", async () => {
        const userService: Partial<UserService> = {
            findById: vi.fn().mockResolvedValue(null),
            deactivate: vi.fn(),
        };

        await expect(
            deactivateUserUseCase({
                payload: { userId: 999 },
                dependencies: { userService: userService as UserService },
            })
        ).rejects.toThrow("User not found");

        expect(userService.findById).toHaveBeenCalledWith(999);
        expect(userService.deactivate).not.toHaveBeenCalled();
    });
});
