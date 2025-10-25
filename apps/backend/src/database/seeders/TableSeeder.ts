import { DataSource } from 'typeorm';
import { TableEntity } from "../entities/TableEntity";

const tables = [
    { capacity: 2, status: 'AVAILABLE' },
    { capacity: 2, status: 'AVAILABLE' },
    { capacity: 2, status: 'AVAILABLE' },
    { capacity: 2, status: 'AVAILABLE' },
    { capacity: 2, status: 'AVAILABLE' },
    { capacity: 4, status: 'AVAILABLE' },
    { capacity: 4, status: 'AVAILABLE' },
    { capacity: 4, status: 'AVAILABLE' },
    { capacity: 4, status: 'AVAILABLE' },
    { capacity: 4, status: 'AVAILABLE' },
    { capacity: 4, status: 'AVAILABLE' },
    { capacity: 4, status: 'AVAILABLE' },
    { capacity: 4, status: 'AVAILABLE' },
    { capacity: 6, status: 'AVAILABLE' },
    { capacity: 6, status: 'AVAILABLE' },
    { capacity: 6, status: 'AVAILABLE' },
    { capacity: 8, status: 'AVAILABLE' },
    { capacity: 8, status: 'AVAILABLE' },
];

export class TableSeeder {
    public async run(dataSource: DataSource): Promise<void> {
        const tableRepository = dataSource.getRepository(TableEntity);
        const createdTables = [];

        for (const tableData of tables) {
            const table = tableRepository.create(tableData);
            createdTables.push(table);
        }

        await tableRepository.save(createdTables);
    }
}