import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./CategoryEntity";
import { OrderItemEntity } from "./OrderItemEntity";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, length: 255, type: 'varchar' })
    name!: string;

    @Column({ nullable: true, length: 255, type: 'varchar' })
    description?: string

    @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
    price!: number;

    @Column({ nullable: true, type: 'int' })
    stock?: number;

    @Column({ name: "categoryId", type: "int" })
    categoryId!: number;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: "categoryId" })
    category!: CategoryEntity;

    @Column({ nullable: false, type: 'varchar' })
    type!: string;

    @OneToMany(() => OrderItemEntity, (item) => item.product)
    orderItems!: OrderItemEntity[];

}
