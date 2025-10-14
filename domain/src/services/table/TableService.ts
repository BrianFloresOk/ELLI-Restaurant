import { Table } from "../../entities/Table";

export interface TableService {
    findById(id: string) : Promise<Table | null>,
    update(id: string, data: Partial<Table>) : Promise<void>
}