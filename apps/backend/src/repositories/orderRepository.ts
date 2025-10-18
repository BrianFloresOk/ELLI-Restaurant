import { OrderService, Order, OrderItem } from "domain-elli";
import { dataSource } from "../database/data-source";
import { Repository } from "typeorm";
import { OrderEntity } from "../database/entities/OrderEntity";
import { orderMapper } from "../utils/mappers/orderMapper";
import { TableEntity } from "../database/entities/TableEntity";
import { OrderItemEntity } from "../database/entities/OrderItemEntity";
import { OrderItemMapper } from "../utils/mappers/orderItemMapper";

const orderRepository: Repository<OrderEntity> = dataSource.getRepository(OrderEntity);
const orderItemRepository: Repository<OrderItemEntity> = dataSource.getRepository(OrderItemEntity);


export const OrderRepository: OrderService = {
    async save(order : Order): Promise<Order> {
        const orderEntity = orderMapper.toPersistence(order);
        await orderRepository.save(orderEntity);
        return order;
    },

    async findById(id: string): Promise<Order | null> {
        const orderEntity = await orderRepository.findOneBy({ id: parseInt(id) });
        return orderEntity ? orderMapper.toDomain(orderEntity) : null;
    },

    async list(): Promise<Order[]> {
        const orderEntities = await orderRepository.find();
        return orderEntities.map(orderMapper.toDomain);
    },

    async update(id: string, order: Order): Promise<void> {
        const orderEntity = orderMapper.toPersistence(order);
        await orderRepository.update({ id: parseInt(id) }, orderEntity);
    },

    async delete(id: string): Promise<void> {
        await orderRepository.delete({ id: parseInt(id) });
    },

    async closeOrder(orderId): Promise<Order> {
        const orderEntity = await orderRepository.findOneBy({ id: parseInt(orderId) });

        if (!orderEntity) throw new Error("Order not found");

        orderEntity.status = "closed";
        await orderRepository.save(orderEntity);
        return orderMapper.toDomain(orderEntity);
    },


    async findByStatus(status: string) {
        const orderEntities = await orderRepository.findBy({ status });
        return orderEntities.map(orderMapper.toDomain);
    },

    async findByTableId(tableId: string): Promise<Order[] | null> {
        const orderEntities = await orderRepository.findBy({ table: { id: parseInt(tableId) } as TableEntity });
        return orderEntities.length > 0 ? orderEntities.map(orderMapper.toDomain) : null;
    },

    async addItem(orderId: string, item: OrderItem): Promise<void> {
        const orderEntity = await orderRepository.findOneBy({ id: parseInt(orderId) });

        if (!orderEntity) throw new Error("Order not found");

        const orderItems = await orderItemRepository.findBy({ order: orderEntity });
        orderItems.push(OrderItemMapper.toPersistence(item));

        orderEntity.total = orderItems.reduce((sum, currentItem) => sum + currentItem.subtotal, 0);

        await orderRepository.save(orderEntity);
    },

    async updateItem(payload: any): Promise<void> {
        const { orderId, itemId, quantity } = payload;

        const orderEntity = await orderRepository.findOneBy({ id: parseInt(orderId) });

        if (!orderEntity) throw new Error("Order not found");

        const orderItem = await orderItemRepository.findOneBy({ id: parseInt(itemId), order: { id: orderEntity.id } });

        if (!orderItem) throw new Error("Order item not found");

        orderItem.quantity = quantity;
        await orderItemRepository.save(orderItem);
    },

    async removeItem(orderId: string, itemId: string): Promise<void> {
        const orderEntity = await orderRepository.findOneBy({ id: parseInt(orderId) });

        if (!orderEntity) throw new Error("Order not found");

        const orderItem = await orderItemRepository.findOneBy({ id: parseInt(itemId), order: { id: orderEntity.id } });

        if (!orderItem) throw new Error("Order item not found");

        await orderItemRepository.remove(orderItem);
    },

    async listItems(orderId: string): Promise<OrderItem[]> {
        const orderItems = await orderItemRepository.findBy({ order: { id: parseInt(orderId) } });
        return orderItems.map(OrderItemMapper.toDomain);
    }
}