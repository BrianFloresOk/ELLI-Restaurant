import { Request, Response } from "express";
import { viewTablesUseCase } from "domain-elli";
import { TableRepository } from "../../repositories/tableRepository";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { TablesDTO } from "../../utils/DTOs/tablesDto";
import { tableDetailsMapper } from "../../utils/mappers/tableDetailsMapper";

export const viewAllTables = async (req: Request, res: Response) => {
    try {
        const data = {
            dependencies: { tableService: TableRepository },
        };
        const tables = await viewTablesUseCase({ dependencies: data.dependencies });
        //const detailedTables = tables.map((table) => tableDetailsMapper(table));
        const response: TablesDTO = { tables };
        return successResponse({
            res,
            message: "Tables fetched successfully",
            statusCode: 200,
            data: response,
        });
    } catch (error) {
        return errorResponse({
            res,
            message: "Error fetching tables",
            statusCode: 500,
        });
    }
};
