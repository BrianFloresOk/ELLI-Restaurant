import { UserService, User } from "domain-elli";
import { UserEntity } from "../database/entities/UserEntity";
import { dataSource } from "../database/data-source";
import { Repository } from "typeorm";
import { userMapper } from "../utils/mappers/userMapper";

const userRepository: Repository<UserEntity> = dataSource.getRepository(UserEntity);


export const UserRepository: UserService = {
    async save(user: User): Promise<void> {
        const userEntity = userMapper.toPersistence(user);
        await userRepository.save(userEntity);
    },

    async findById(id: string): Promise<User | null> {
        const userEntity = await userRepository.findOneBy({ id: parseInt(id) as any });
        return userEntity ? userMapper.toDomain(userEntity) : null;
    },

    async update(user: User): Promise<void> {
        const userEntity = userMapper.toPersistence(user);
        await userRepository.save(userEntity);
    },

    async deactivate(id: string): Promise<void> {
        await userRepository.update(parseInt(id), { isActive: false });
    },

    async findByRole(role: string): Promise<User[]> {
        const userEntities = await userRepository.findBy({ role });
        return userEntities.map(userMapper.toDomain);
    },
    
    async findByEmail(email: string): Promise<User | null> {
        const userEntity = await userRepository.findOneBy({ email });
        return userEntity ? userMapper.toDomain(userEntity) : null;
    }
};