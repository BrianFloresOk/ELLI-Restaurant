import { Category } from "../../entities/Category";

export interface CategoryService {
    save(category: Partial<Category>): Promise<void>;
    findById(id: number): Promise<Category | null>;
    findAll(): Promise<Category[]>;
}