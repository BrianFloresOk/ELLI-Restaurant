import { describe, it, expect, vi } from "vitest";
import { viewTablesUseCase } from "./viewTablesUseCase";
import { TableService } from "../../services/table/TableService";

describe("viewTablesUseCase", () => {
    it("debería retornar todas las mesas llamando a tableService.findAll", async () => {
        const mockTables = [
            { id: 1, number: 1, capacity: 4, status: "AVAILABLE" },
            { id: 2, number: 2, capacity: 2, status: "OCCUPIED" },
        ];

        const tableService: Partial<TableService> = {
            findAll: vi.fn().mockResolvedValue(mockTables),
        };

        const result = await viewTablesUseCase({
            dependencies: { tableService: tableService as TableService },
        });

        expect(tableService.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockTables);
    });

    it("debería lanzar un error si tableService.findAll falla", async () => {
        const tableService: Partial<TableService> = {
            findAll: vi.fn().mockRejectedValue(new Error("Database error")),
        };

        await expect(
            viewTablesUseCase({
                dependencies: { tableService: tableService as TableService },
            })
        ).rejects.toThrow("Database error");

        expect(tableService.findAll).toHaveBeenCalledTimes(1);
    });
});
