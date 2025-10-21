import { Product } from "domain-elli";
import { IMapper } from "../../types/IMapper";
import { ProductEntity } from "../../database/entities/ProductEntity";

type ProductEntityPersistence = Omit<ProductEntity, 'orderItems' | 'category'>;

export const productMapper: IMapper<Product, ProductEntityPersistence> = {
    toDomain,
    toPersistence
}

export function toDomain(entity: ProductEntity): Product {
    const productDomain: Product = {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        price: entity.price,
        type: entity.type as "DISH" | "DRINK",
        categoryId: entity.categoryId,
    };
    return productDomain;
}

export function toPersistence(domain: Product): ProductEntityPersistence {

    const productEntity: ProductEntityPersistence = {
        id: domain.id,
        name: domain.name,
        description: domain.description,
        price: domain.price,
        type: domain.type,
        stock: domain.stock,
        categoryId: domain.categoryId,
    };
    return productEntity;
}
