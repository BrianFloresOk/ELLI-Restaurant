import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./OrderEntity";
import { ReservationEntity } from "./ReservationEntity";

@Entity("tables")
export class TableEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, type: "int" })
    capacity!: number;

    @Column({ nullable: false, type: "varchar", default: 'AVAILABLE' })
    status!: string;

    @Column({ nullable: true, type: "int" })
    assignedWaiterId?: number;

    @OneToMany(() => OrderEntity, order => order.table)
    orders!: OrderEntity[];

    @OneToMany(() => ReservationEntity, reservation => reservation.table)
    reservations!: ReservationEntity[];
}