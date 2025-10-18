import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { OrderEntity } from "./OrderEntity";
import { ProductEntity } from "./ProductEntity";


@Entity("order_items")
export class OrderItemEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => OrderEntity, (order) => order.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "orderId" })
    order!: OrderEntity;

    @ManyToOne(() => ProductEntity, (product) => product.orderItems)
    @JoinColumn({ name: "productId" })
    product!: ProductEntity;

    @Column("int")
    quantity!: number;

    @Column("decimal", { precision: 10, scale: 2 })
    unitPrice!: number;

    @Column("decimal", { precision: 10, scale: 2 })
    subtotal!: number;

    @Column({
        type: "varchar",
        nullable: false,
        default: "pending",
    })
    status!: string;

    @Column({ type: "varchar", nullable: true })
    notes?: string;
}
