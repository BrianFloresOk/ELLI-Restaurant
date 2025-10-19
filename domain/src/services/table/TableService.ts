import { Table } from "../../entities/Table";

export interface TableService {
    findById(id: number) : Promise<Table | null>,
    update(id: number, data: Partial<Table>) : Promise<void>
}