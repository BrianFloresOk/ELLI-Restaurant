// OrderEntity.ts (CORREGIDO)
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TableEntity } from "./TableEntity";
import { PaymentEntity } from "./PaymentEntity";
import { OrderItemEntity } from "./OrderItemEntity"; // Nueva Importación

@Entity("orders")
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "tableId", type: "int" })
    tableId!: number;

    @ManyToOne(() => TableEntity, table => table.orders)
    @JoinColumn({ name: "tableId" })
    table!: TableEntity;

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

    @OneToMany(() => OrderItemEntity, (item) => item.order)
    orderItems!: OrderItemEntity[];

    @OneToOne(() => PaymentEntity, payment => payment.order)
    payment!: PaymentEntity;
}