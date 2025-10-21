import { Product } from "../../entities/Product";

export interface ProductService {
    save(product: Omit<Product, "id">): Promise<void>;
    findById(id: number): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    delete(id: number): Promise<void>;
}