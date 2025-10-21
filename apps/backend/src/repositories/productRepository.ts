import { Product, ProductService } from "domain-elli";
import { Repository } from "typeorm";
import { dataSource } from "../database/data-source";
import { ProductEntity } from "../database/entities/ProductEntity";
import { productMapper } from "../utils/mappers/productMapper";
import { NotFoundError } from "../utils/errors";

const productRepository: Repository<ProductEntity> = dataSource.getRepository(ProductEntity);


export const ProductRepository: ProductService = {
    save: async (product: Product): Promise<void> => {
        const entity = productMapper.toPersistence(product);
        await productRepository.save(entity);
    },

    findById: async (id: number): Promise<Product | null> => {
        const entity = await productRepository.findOneBy({ id });

        if (!entity) throw new NotFoundError("Product not found");
        const product = productMapper.toDomain(entity);
        return product;
    },

    findAll: async (): Promise<Product[]> => {
        const productsEntity: ProductEntity[] = await productRepository.find();
        const products: Product[] = productsEntity.map(productMapper.toDomain);
        return products;
    },

    delete: async (id: number): Promise<void> => {
        const entity = await productRepository.findOneBy({ id });

        if (!entity) throw new NotFoundError("Product not found");

        await productRepository.delete(id);
    }
}