import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProductEntity } from "./ProductEntity";

@Entity("categories")
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, length: 255, type: "varchar" })
    name!: string;

    @Column({ nullable: true, length: 255, type: "varchar" })
    description?: string;

    @Column({ nullable: true, type: "varchar" })
    preparationArea?: string;

    @OneToMany(() => ProductEntity, (product) => product.category)
    products!: ProductEntity[];
}