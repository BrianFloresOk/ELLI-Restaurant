import { Repository } from "typeorm";
import { TableEntity } from "../database/entities/TableEntity";
import { dataSource } from "../database/data-source";
import { Table, TableService } from "domain-elli";
import { NotFoundError } from "../utils/errors";
import { tableMapper } from "../utils/mappers/tableMapper";


const tableRepository: Repository<TableEntity> = dataSource.getRepository(TableEntity);

export const TableRepository: TableService = {
    async findById(id: number): Promise<Table | null> {
        const tableEntity = await tableRepository.findOne({ where: { id } });
        if (!tableEntity) throw new NotFoundError("Table not found");
        
        const table: Table = tableMapper.toDomain(tableEntity);
        return table;
    },

    async update(id: number, data: Partial<Table>): Promise<void> {
        const tableEntity = await tableRepository.findOne({ where: { id } });

        if (!tableEntity) throw new NotFoundError("Table not found");

        const dataEntity = tableMapper.toPersistence(data as Table);

        const updatedEntity = {
            ...tableEntity,
            ...dataEntity,
        };

        await tableRepository.update({ id }, updatedEntity);
    },

    async findAll(): Promise<Table[]> {
        const tableEntities = await tableRepository.find({ order: { id: "ASC" }, relations: ["orders.orderItems"] });
        console.log(tableEntities)
        return tableEntities.map(tableMapper.toDomain);
    }
}