import { OrderService, Order, OrderItem, Product } from "domain-elli";
import { dataSource } from "../database/data-source";
import { Repository } from "typeorm";
import { OrderEntity } from "../database/entities/OrderEntity";
import { orderMapper } from "../utils/mappers/orderMapper";
import { TableEntity } from "../database/entities/TableEntity";
import { OrderItemEntity } from "../database/entities/OrderItemEntity";
import { orderItemMapper } from "../utils/mappers/orderItemMapper";
import { NotFoundError } from "../utils/errors";
import { ProductEntity } from "../database/entities/ProductEntity";


const orderRepository: Repository<OrderEntity> = dataSource.getRepository(OrderEntity);
const orderItemRepository: Repository<OrderItemEntity> = dataSource.getRepository(OrderItemEntity);
const productRepository: Repository<ProductEntity> = dataSource.getRepository(ProductEntity);


export const OrderRepository: OrderService = {
    async save(order: Order): Promise<Order> {
        const orderEntity = orderMapper.toPersistence(order);
        await orderRepository.save(orderEntity);
        return order;
    },

    async findById(id: number): Promise<Order> {
        const orderEntity: OrderEntity | null = await orderRepository.findOne({ where: { id }, relations: ["table"] });

        if (!orderEntity) throw new NotFoundError("Order not found");

        return orderMapper.toDomain(orderEntity);
    },

    async list(): Promise<Order[]> {
        const orderEntities = await orderRepository.find({
            relations: ["table"]
        });
        const orders: Order[] = orderEntities.map((entity) => orderMapper.toDomain(entity));
        return orders;
    },

    async update(id: number, order: Order): Promise<void> {
        const orderEntity = orderMapper.toPersistence(order);
        await orderRepository.update({ id }, orderEntity);
    },

    async delete(id: number): Promise<void> {
        await orderRepository.delete({ id });
    },

    async closeOrder(orderId: number): Promise<Order> {
        const orderEntity = await orderRepository.findOne({ where: { id: orderId }, relations: ["table"] });

        if (!orderEntity) throw new NotFoundError("Order not found");

        orderEntity.status = "closed";
        await orderRepository.save(orderEntity);
        return orderMapper.toDomain(orderEntity);
    },


    async findByStatus(status: string): Promise<Order[]> {
        const orderEntities = await orderRepository.find({ where: { status }, relations: ["table"] });
        const orders = orderEntities.map((entity) => orderMapper.toDomain(entity));
        return orders;
    },

    async findByTableId(tableId: number): Promise<Order[] | null> {
        const orderEntities = await orderRepository.find({
            where:
                { table: { id: tableId } as TableEntity },
            relations: ["table"]
        })

        if (orderEntities.length === 0) {
            throw new NotFoundError("No orders found for the specified table");
        }

        const orders = orderEntities.map((entity) => orderMapper.toDomain(entity));
        return orders;
    },

    async addItem(orderId: number, item: OrderItem): Promise<void> {
        const orderEntity = await orderRepository.findOneBy({ id: orderId });

        if (!orderEntity) throw new NotFoundError("Order not found");

        const productEntity = await productRepository.findOneBy({ id: item.productId });
        if (!productEntity) throw new NotFoundError("Product not found");

        const completeItem: OrderItem = {
            ...item,
            unitPrice: productEntity.price,
            subtotal: item.quantity * productEntity.price
        };

        const newItemEntity = orderItemMapper.toPersistence(completeItem);
        newItemEntity.order = orderEntity;

        const savedItem = await orderItemRepository.save(newItemEntity);
        orderEntity.total = orderEntity.total + savedItem.subtotal;

        await orderRepository.save(orderEntity);
    },

    async updateItem(payload: any): Promise<void> {
        const { orderId, itemId, quantity } = payload;
        const orderEntity = await orderRepository.findOneBy({ id: orderId });
        if (!orderEntity) throw new NotFoundError("Order not found");
        const orderItem = await orderItemRepository.findOne({
            where: { id: itemId, orderId: orderEntity.id },
            relations: ['product']
        });
        if (!orderItem) throw new NotFoundError("Order item not found");

        const oldSubtotal = orderItem.subtotal;

        const newSubtotal = orderItem.unitPrice * quantity;
        orderItem.quantity = quantity;
        orderItem.subtotal = newSubtotal;
        await orderItemRepository.save(orderItem);

        const totalDifference = newSubtotal - oldSubtotal;
        orderEntity.total = orderEntity.total + totalDifference;
        await orderRepository.save(orderEntity);
    },

    async removeItem(orderId: number, itemId: number): Promise<void> {
        // 1. Buscar Orden (Necesaria para actualizar el total)
        const orderEntity = await orderRepository.findOneBy({ id: orderId });
        if (!orderEntity) throw new Error("Order not found");

        // 2. Buscar Ítem a Eliminar
        const orderItem = await orderItemRepository.findOneBy({ id: itemId, order: { id: orderEntity.id } });
        if (!orderItem) throw new Error("Order item not found");

        // 3. Actualizar el Total de la Orden ANTES de eliminar
        orderEntity.total = orderEntity.total - orderItem.subtotal;

        // 4. Eliminar el ítem y Guardar la Orden
        // Es mucho más seguro y transaccional hacerlo dentro de TypeORM's queryRunner.
        await orderItemRepository.remove(orderItem);
        await orderRepository.save(orderEntity); // 👈 ¡GUARDAR LA ORDEN CON EL NUEVO TOTAL!
    },

    async listItems(orderId: number): Promise<OrderItem[]> {
        const orderItems = await orderItemRepository.findBy({ order: { id: orderId } });
        return orderItems.map(orderItemMapper.toDomain);
    }
}