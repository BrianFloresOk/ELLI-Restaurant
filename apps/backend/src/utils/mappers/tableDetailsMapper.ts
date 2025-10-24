import { TableEntity } from "../../database/entities/TableEntity";

export function tableDetailsMapper(tableEntity: TableEntity): any {
    return {
        id: tableEntity.id,
        capacity: tableEntity.capacity,
        status: tableEntity.status,
        orders: tableEntity.orders.map(order => ({
            id: order.id,
            items: order.orderItems.map(item => ({
                id: item.id,
                item: item.product,
                quantity: item.quantity
            }))
        }))
    };
}