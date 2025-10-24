import { ItemOrderStatus, OrderItem } from "domain-elli";
import { OrderItemEntity } from "../../database/entities/OrderItemEntity";
import { IMapper } from "../../types/IMapper";

export const orderItemMapper: IMapper<OrderItem, OrderItemEntity> = {
    toDomain,
    toPersistence
}

export function toDomain(entity: OrderItemEntity): OrderItem {

    const orderItemDomain: OrderItem = {
        id: entity.id,
        orderId: entity.orderId,
        productId: entity.productId,
        quantity: entity.quantity,
        unitPrice: entity.unitPrice,
        status: entity.status as ItemOrderStatus,
        notes: entity.notes,
    };
    return orderItemDomain;
}


export function toPersistence(domain: OrderItem): OrderItemEntity {

    const orderItemEntity: OrderItemEntity = {
        id: domain.id,
        orderId: domain.orderId,
        productId: domain.productId,
        order: undefined as any,
        product: undefined as any,
        quantity: domain.quantity,
        unitPrice: domain.unitPrice,
        status: domain.status,
        notes: domain.notes,
    };

    return orderItemEntity;
}