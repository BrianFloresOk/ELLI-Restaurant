import { Product } from "../../entities/Product";

export interface ProductService {
    save(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    delete(id: string): Promise<void>;
}