// PaymentEntity.ts (CORREGIDO)
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./OrderEntity";

@Entity("payments")
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => OrderEntity, order => order.payment)
    @JoinColumn({ name: "orderId" })
    order?: OrderEntity;

    @Column({ type: "int" })
    orderId!: number;

    @Column({ type: "varchar", length: 50 })
    method!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    paidAt!: Date;
}