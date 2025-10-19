import { Order, OrderStatus } from "domain-elli";
import { OrderEntity } from "../../database/entities/OrderEntity";
import { IMapper } from "../../types/IMapper";
import { tableMapper } from "./tableMapper";
import { orderItemMapper } from "./orderItemMapper";


export const orderMapper: IMapper<Order, OrderEntity> = {
    toDomain,
    toPersistence
}

export function toDomain(entity: OrderEntity): Order {
    const orderDomain: Order = {
        id: entity.id,
        tableId: entity.tableId,
        waiterId: entity.waiterId,
        cashierId: entity.cashierId,
        status: entity.status as OrderStatus,
        total: entity.total,
        orderDate: entity.orderDate,
        closedDate: entity.closedDate,
    }

    if (entity.table) {
        orderDomain.table = tableMapper.toDomain(entity.table);
    }
    if (entity.orderItems) {
        orderDomain.orderItems = entity.orderItems.map(item =>
            orderItemMapper.toDomain(item)
        );
    }

    return orderDomain;
}


export function toPersistence(domain: Order): OrderEntity {

    const orderEntity: OrderEntity = {
        id: domain.id,
        tableId: domain.tableId,
        table: undefined as any,
        waiterId: domain.waiterId,
        cashierId: domain.cashierId ? domain.cashierId : undefined,
        status: domain.status,
        total: domain.total ?? 0,
        orderDate: domain.orderDate ?? new Date(),
        closedDate: domain.closedDate,
        payment: undefined as any,
        orderItems: undefined as any,
    };
    return orderEntity
}