import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TableEntity } from "./TableEntity";
import { PaymentEntity } from "./PaymentEntity";


@Entity("orders")
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id!: number;

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

    @OneToOne(() => PaymentEntity, payment => payment.order)
    payment!: PaymentEntity;
}