import { ItemOrderStatus, OrderItem } from "domain-elli";
import { OrderItemEntity } from "../../database/entities/OrderItemEntity";
import { IMapper } from "../../types/IMapper";

export const orderItemMapper: IMapper<OrderItem, OrderItemEntity> = {
    toDomain,
    toPersistence
}

export function toDomain(entity: OrderItemEntity): OrderItem {

    const subtotal = calculateSubtotal(entity.product.price, entity.quantity);
    const orderItemDomain: OrderItem = {
        id: entity.id,
        orderId: entity.order.id,
        productId: entity.product.id,
        quantity: entity.quantity,
        unitPrice: entity.product.price,
        subtotal: subtotal,
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
        subtotal: domain.subtotal,
        status: domain.status,
        notes: domain.notes,
    };

    return orderItemEntity as OrderItemEntity;
}

function calculateSubtotal(unitPrice: number, quantity: number): number {
    return unitPrice * quantity;
}