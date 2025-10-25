import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { OrderEntity } from "./OrderEntity";


@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, length: 100, type: "varchar" })
    name!: string;

    @Column({ unique: true, nullable: false, length: 255, type: "varchar" })
    email!: string;

    @Column({ nullable: false, length: 255, type: "varchar" })
    password!: string;

    @Column({ nullable: false, length: 255, type: "varchar" })
    role!: string;

    @Column({ nullable: true, type: "boolean", default: true })
    isActive!: boolean;

    @Column({ nullable: true, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @OneToMany(() => OrderEntity, order => order.waiter)
    waiterOrders!: OrderEntity[];

    @OneToMany(() => OrderEntity, order => order.cashier)
    cashierOrders!: OrderEntity[];
}