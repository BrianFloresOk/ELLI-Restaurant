import { Order, OrderStatus } from "domain-elli";
import { OrderEntity } from "../../database/entities/OrderEntity";
import { IMapper } from "../../types/IMapper";
import { TableEntity } from "../../database/entities/TableEntity";


export const orderMapper: IMapper<Order, OrderEntity> = {
    toDomain,
    toPersistence
}

export function toDomain(entity: OrderEntity): Order {
    const orderDomain: Order = {
        id: entity.id,
        tableId: entity.table.id,
        waiterId: entity.waiterId,
        cashierId: entity.cashierId,
        status: entity.status as OrderStatus,
        total: entity.total,
        orderDate: entity.orderDate,
        closedDate: entity.closedDate,
    }
    return orderDomain
}


export function toPersistence(domain: Order): OrderEntity {
    const orderEntity: OrderEntity = {
        id: domain.id,
        table: { id: domain.tableId } as TableEntity,
        waiterId: domain.waiterId,
        cashierId: domain.cashierId ? domain.cashierId : undefined,
        status: domain.status,
        total: domain.total ? domain.total : 0,
        orderDate: domain.orderDate ?? new Date(),
        closedDate: domain.closedDate,
        payment: undefined as any,
    };
    return orderEntity;
}