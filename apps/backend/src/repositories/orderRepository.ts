import { OrderService, Order, OrderItem, ItemOrderStatus } from "domain-elli";
import { dataSource } from "../database/data-source";
import { OrderEntity } from "../database/entities/OrderEntity";
import { OrderItemEntity } from "../database/entities/OrderItemEntity";
import { ProductEntity } from "../database/entities/ProductEntity";
import { TableEntity } from "../database/entities/TableEntity";
import { orderMapper } from "../utils/mappers/orderMapper";
import { orderItemMapper } from "../utils/mappers/orderItemMapper";
import { NotFoundError } from "../utils/errors";

const orderRepository = dataSource.getRepository(OrderEntity);
const orderItemRepository = dataSource.getRepository(OrderItemEntity);
const productRepository = dataSource.getRepository(ProductEntity);

export const OrderRepository: OrderService = {

    async save(order: Order): Promise<Order> {
        const orderEntity = orderMapper.toPersistence(order);
        const saved = await orderRepository.save(orderEntity);
        return orderMapper.toDomain(saved);
    },

    async findById(id: number): Promise<Order> {
        const orderEntity = await orderRepository.findOne({
            where: { id },
            relations: ["table", "orderItems", "orderItems.product"],
        });

        if (!orderEntity) throw new NotFoundError("Order not found");
        const order = orderMapper.toDomain(orderEntity);
        return order
    },

    async list(): Promise<Order[]> {
        const entities = await orderRepository.find({ order: { id: "ASC" }, relations: ["table"] });
        return entities.map(orderMapper.toDomain);
    },

    async update(id: number, order: Order): Promise<void> {
        const orderEntity = orderMapper.toPersistence(order);
        await orderRepository.update({ id }, orderEntity);
    },

    async delete(id: number): Promise<void> {
        await orderRepository.delete({ id });
    },

    async closeOrder(orderId: number): Promise<Order> {
        const orderEntity = await findOrderEntity(orderId);
        orderEntity.status = "closed";
        const saved = await orderRepository.save(orderEntity);
        return orderMapper.toDomain(saved);
    },

    async findByStatus(status: string): Promise<Order[]> {
        const entities = await orderRepository.find({
            where: { status },
            relations: ["table"],
        });
        return entities.map(orderMapper.toDomain);
    },

    async findByTableId(tableId: number): Promise<Order[]> {
        const entities = await orderRepository.find({
            where: {
                table: { id: tableId } as TableEntity
            },
            relations: ["table"],
        });

        if (entities.length === 0) {
            throw new NotFoundError("No orders found for the specified table");
        }

        return entities.map(orderMapper.toDomain);
    },

    async addItem(orderId: number, item: OrderItem): Promise<void> {
        const orderEntity = await findOrderEntity(orderId);
        const productEntity = await findProductEntity(item.productId);

        const completeItem: OrderItem = {
            ...item,
            unitPrice: productEntity.price,
            subtotal: item.quantity * productEntity.price,
        };

        const newItemEntity = orderItemMapper.toPersistence(completeItem);
        newItemEntity.order = orderEntity;

        const savedItem = await orderItemRepository.save(newItemEntity);

        orderEntity.total = (orderEntity.total || 0) + savedItem.subtotal;
        await orderRepository.save(orderEntity);
    },

    async updateItemQuantity({
        orderId,
        itemId,
        quantity,
    }: {
        orderId: number;
        itemId: number;
        quantity: number;
    }): Promise<void> {
        const orderEntity = await findOrderEntity(orderId);
        const orderItem = await findOrderItemEntity(orderEntity.id, itemId);

        if (!orderItem.unitPrice) {
            throw new Error(`Invalid data: missing unitPrice for OrderItem ID ${itemId}`);
        }

        const oldSubtotal = orderItem.subtotal;
        const newSubtotal = orderItem.unitPrice * quantity;

        orderItem.quantity = quantity;
        orderItem.subtotal = newSubtotal;

        await orderItemRepository.save(orderItem);

        orderEntity.total = (orderEntity.total || 0) + (newSubtotal - oldSubtotal);
        await orderRepository.save(orderEntity);
    },

    async removeItem(orderId: number, itemId: number): Promise<void> {
        const orderEntity = await findOrderEntity(orderId);
        const orderItem = await findOrderItemEntity(orderEntity.id, itemId);

        orderEntity.total = (orderEntity.total || 0) - orderItem.subtotal;

        await orderItemRepository.remove(orderItem);
        await orderRepository.save(orderEntity);
    },

    async listItems(orderId: number): Promise<OrderItem[]> {
        const items = await orderItemRepository.find({
            where: { order: { id: orderId } },
        });
        return items.map(orderItemMapper.toDomain);
    },

    async findItemByProduct(
        orderId: number,
        productId: number
    ): Promise<OrderItem | null> {
        const entity = await orderItemRepository.findOne({
            where: {
                order: { id: orderId },
                product: { id: productId },
            },
            relations: ["order", "product"],
        });

        return entity ? orderItemMapper.toDomain(entity) : null;
    },

    async updateItemStatusByOrder(orderId: number, fromStatus: ItemOrderStatus, toStatus: ItemOrderStatus): Promise<void> {
        await orderItemRepository.update(
            {
                orderId: orderId,
                status: fromStatus
            },
            {
                status: toStatus
            }
        );
    }
};

async function findOrderEntity(orderId: number): Promise<OrderEntity> {
    const orderEntity = await orderRepository.findOneBy({ id: orderId });
    if (!orderEntity) throw new NotFoundError("Order not found");
    return orderEntity;
}

async function findProductEntity(productId: number): Promise<ProductEntity> {
    const productEntity = await productRepository.findOneBy({ id: productId });
    if (!productEntity) throw new NotFoundError("Product not found");
    return productEntity;
}

async function findOrderItemEntity(
    orderId: number,
    itemId: number
): Promise<OrderItemEntity> {
    const orderItem = await orderItemRepository.findOneBy({
        id: itemId,
        order: { id: orderId },
    });
    if (!orderItem) throw new NotFoundError("Order item not found");
    return orderItem;
}
