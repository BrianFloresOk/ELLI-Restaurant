import { describe, it, expect, vi } from "vitest";
import { viewUserListUseCase } from "./viewUserListUseCase";
import { UserService } from "../../services/users/UserService";

describe("viewUserListUseCase", () => {
    it("debería retornar la lista de usuarios", async () => {
        const mockUsers = [
            { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "WAITER" },
            { id: 2, name: "María López", email: "maria@example.com", role: "CHEF" },
        ];

        const userService: Partial<UserService> = {
            find: vi.fn().mockResolvedValue(mockUsers),
        };

        const result = await viewUserListUseCase({
            dependencies: { userService: userService as UserService },
        });

        expect(userService.find).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUsers);
    });

    it("debería retornar un array vacío si no hay usuarios", async () => {
        const userService: Partial<UserService> = {
            find: vi.fn().mockResolvedValue([]),
        };

        const result = await viewUserListUseCase({
            dependencies: { userService: userService as UserService },
        });

        expect(userService.find).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });
});
