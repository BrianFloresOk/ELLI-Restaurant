import { IMapper } from "../../types/IMapper";
import { Category } from "domain-elli";
import { CategoryEntity } from "../../database/entities/CategoryEntity";

type CategoryEntityPersistence = Omit<CategoryEntity, 'products'>;

export const categoryMapper: IMapper<Category, CategoryEntityPersistence> = {
    toDomain,
    toPersistence
}

export function toDomain(entity: CategoryEntity): Category {
    const categoryDomain: Category = {
        id: entity.id,
        name: entity.name,
        description: entity.description,
    };
    return categoryDomain;
}

export function toPersistence(domain: Category): CategoryEntityPersistence {
    const categoryEntity: CategoryEntityPersistence = {
        id: domain.id,
        name: domain.name,
        description: domain.description,
    }
    return categoryEntity;
}