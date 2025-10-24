import { Table } from "../../entities/Table";
import { TableService } from "../../services/table/TableService";

interface Dependencies {
    tableService: TableService
}

export const viewTablesUseCase = async ({ dependencies }: { dependencies: Dependencies }): Promise<Table[]> => {
    const { tableService } = dependencies;
    return tableService.findAll();
};