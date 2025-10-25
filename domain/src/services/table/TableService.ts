import { Table } from "../../entities/Table";

export interface CreateTableDto {
    capacity: number;
}

export interface TableService {
    findById(id: number) : Promise<Table | null>,
    update(id: number, data: Partial<Table>) : Promise<void>,
    findAll(): Promise<Table[]>;
    save(data: CreateTableDto): Promise<void>;
    verifyTableAvailability(tableId: number): Promise<boolean>;
}