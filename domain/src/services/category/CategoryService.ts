import { Category } from "../../entities/Category";

export interface CategoryService {
    save(category: Partial<Category>): Promise<Category>;
    findById(id: string): Promise<Category | null>;
    findAll(): Promise<Category[]>;
    delete(id: string): Promise<void>;
}