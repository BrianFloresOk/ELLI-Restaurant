import { User, UserRol } from "domain-elli";
import { UserEntity } from "../../database/entities/UserEntity";
import { IMapper } from "../../types/IMapper";


export const userMapper : IMapper<User, UserEntity> = {
    toDomain,
    toPersistence
}

export function toDomain(entity: UserEntity): User {
    const userDomain: User = {
        id: entity.id.toString(),
        name: entity.name,
        email: entity.email,
        password: entity.password,
        role: entity.role as UserRol,
        isActive: entity.isActive,
        createdAt: entity.createdAt,
    }
    return userDomain
}


export function toPersistence(domainUser: User): UserEntity {
    const userEntity: UserEntity = {
        id: parseInt(domainUser.id),
        name: domainUser.name,
        email: domainUser.email,
        password: domainUser.password,
        role: domainUser.role.toString(),
        isActive: domainUser.isActive,
        createdAt: domainUser.createdAt,
    };

    return userEntity;
}