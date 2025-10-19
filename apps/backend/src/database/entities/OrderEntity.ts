// OrderEntity.ts (CORREGIDO)
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TableEntity } from "./TableEntity";
import { PaymentEntity } from "./PaymentEntity";
import { OrderItemEntity } from "./OrderItemEntity"; // Nueva Importación

@Entity("orders")
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    // --- MEJORA: Exponer ID ---
    @Column({ name: "tableId", type: "int" })
    tableId!: number; // Columna de clave externa

    @ManyToOne(() => TableEntity, table => table.orders)
    @JoinColumn({ name: "tableId" })
    table!: TableEntity;

    // --- RELACIONES EXISTENTES ---
    @Column({ nullable: false, type: "int" })
    waiterId!: number;

    @Column({ nullable: true, type: "int" })
    cashierId?: number;

    @Column({ nullable: false, type: "varchar", length: 50 })
    status!: string;

    @Column({ nullable: false, type: "decimal", precision: 10, scale: 2 })
    total!: number;

    @Column({ nullable: false, type: "timestamp" })
    orderDate!: Date;

    @Column({ nullable: true, type: "timestamp" })
    closedDate?: Date;

    // --- CORRECCIÓN CLAVE: Order Items ---
    @OneToMany(() => OrderItemEntity, (item) => item.order)
    orderItems!: OrderItemEntity[]; // <- ¡AGREGADO!

    // --- RELACIÓN CON PAYMENT ---
    @OneToOne(() => PaymentEntity, payment => payment.order) // Referencia inversa a la propiedad 'order' en PaymentEntity
    payment!: PaymentEntity;
}