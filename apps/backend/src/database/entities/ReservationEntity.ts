import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TableEntity } from "./TableEntity";

@Entity("reservations")
export class ReservationEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => TableEntity, table => table.reservations)
    @JoinColumn({ name: "tableId" })
    table!: TableEntity;

    @Column({ nullable: false, type: "varchar", length: 100 })
    customerName!: string;

    @Column({ nullable: true, type: "varchar", length: 15 })
    customerPhone?: string;

    @Column({ nullable: false, type: "varchar", length: 100 })
    customerEmail!: string;

    @Column({ nullable: false, type: "timestamp" })
    date!: Date;

    @Column({ nullable: false, type: "varchar", length: 5 })
    hour!: string;

    @Column({ nullable: false, type: "int" })
    people!: number;

    @Column({ nullable: false, type: "varchar", length: 20 })
    status!: string;

    @Column({ nullable: true, type: "int" })
    tableId?: number;
}
