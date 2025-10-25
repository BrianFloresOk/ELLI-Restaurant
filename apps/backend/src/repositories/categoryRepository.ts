import { Category, CategoryService } from "domain-elli";
import { dataSource } from "../database/data-source";
import { CategoryEntity } from "../database/entities/CategoryEntity";
import { categoryMapper } from "../utils/mappers/categoryMapper";

const categoryRepository = dataSource.getRepository(CategoryEntity);

export const CategoryRepository: CategoryService = {
    async findAll() {
        const categoriesEntity = await categoryRepository.find({ order: { id: "ASC" } });
        return categoriesEntity.map((category) => categoryMapper.toDomain(category));
    },

    async findById(id: number): Promise<Category | null> {
        const categoryEntity = await categoryRepository.findOne({ where: { id } });
        if (!categoryEntity) return null;
        return categoryMapper.toDomain(categoryEntity);
    },
    async save(category: Omit<Category, "id">): Promise<void> {
        const newCategoryEntity = categoryRepository.create({
            name: category.name,
            description: category.description,
        });
        await categoryRepository.save(newCategoryEntity);
    },

};