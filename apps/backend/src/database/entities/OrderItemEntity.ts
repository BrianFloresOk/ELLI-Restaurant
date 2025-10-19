// OrderItemEntity.ts (CORREGIDO)
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { OrderEntity } from "./OrderEntity";
import { ProductEntity } from "./ProductEntity";

@Entity("order_items")
export class OrderItemEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    // --- MEJORA: Exponer ID de la Orden ---
    @Column({ name: "orderId", type: "int" })
    orderId!: number;
    
    @ManyToOne(() => OrderEntity, (order) => order.orderItems, { onDelete: "CASCADE" }) // Ahora apunta a 'orderItems'
    @JoinColumn({ name: "orderId" })
    order!: OrderEntity;
    
    // --- MEJORA: Exponer ID del Producto ---
    @Column({ name: "productId", type: "int" })
    productId!: number;

    @ManyToOne(() => ProductEntity, (product) => product.orderItems)
    @JoinColumn({ name: "productId" })
    product!: ProductEntity;

    // ... (El resto de las columnas están correctas)
    @Column("int")
    quantity!: number;

    @Column("decimal", { precision: 10, scale: 2 })
    unitPrice!: number;

    @Column("decimal", { precision: 10, scale: 2 })
    subtotal!: number;

    @Column({ type: "varchar", nullable: false, default: "pending" })
    status!: string;

    @Column({ type: "varchar", nullable: true })
    notes?: string;
}