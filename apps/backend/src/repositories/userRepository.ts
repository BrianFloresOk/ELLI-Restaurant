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

    async findById(id: number): Promise<User | null> {
        const userEntity = await userRepository.findOneBy({ id });
        return userEntity ? userMapper.toDomain(userEntity) : null;
    },

    async update(id: number, user: User): Promise<void> {
        const userEntity = userMapper.toPersistence(user);
        await userRepository.update(id, userEntity);
    },

    async deactivate(id: number): Promise<void> {
        await userRepository.update(id, { isActive: false });
    },

    async activate(id: number): Promise<void> {
        await userRepository.update(id, { isActive: true });
    },

    async find(): Promise<User[]> {
        const userEntities = await userRepository.find({order: { id: "ASC" }});
        return userEntities.map(userMapper.toDomain);
    },
    
    async findByEmail(email: string): Promise<User | null> {
        const userEntity = await userRepository.findOneBy({ email });
        return userEntity ? userMapper.toDomain(userEntity) : null;
    }
};