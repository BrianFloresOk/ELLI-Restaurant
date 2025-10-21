import { IMapper } from "../../types/IMapper";
import { Table } from "domain-elli";
import { TableEntity } from "../../database/entities/TableEntity";

type TableEntityPersistence = Omit<TableEntity, 'orders' | 'reservations'>;

export const tableMapper: IMapper<Table, TableEntityPersistence> = {
    toDomain,
    toPersistence
}

export function toDomain(entity: TableEntity): Table {
    const tableDomain: Table = {
        id: entity.id,
        capacity: entity.capacity,
        status: entity.status as 'AVAILABLE' | 'OCCUPIED' | 'NEEDS_CLEANING',
    };
    return tableDomain;
}

export function toPersistence(domain: Table): TableEntityPersistence {
    const tableEntity: TableEntityPersistence = {
        id: domain.id,
        capacity: domain.capacity,
        status: domain.status,
        assignedWaiterId: domain.assignedWaiterId,
    }
    return tableEntity;
}