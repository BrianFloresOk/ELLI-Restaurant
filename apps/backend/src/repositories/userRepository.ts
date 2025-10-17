import { UserService, User, UserRole } from "domain-elli"; // Incluí UserRole por si se usa en el dominio
import { UserEntity } from "../database/entities/UserEntity";
import { dataSource } from "../database/data-source";
import { Repository } from "typeorm";
import { userMapper } from "../utils/mappers/userMapper";


// ----------------------------------------------------
// 1. Inicialización
// ----------------------------------------------------
// El TypeORM Repository trabaja con la entidad de persistencia (UserEntity)
const userRepository: Repository<UserEntity> = dataSource.getRepository(UserEntity);


export const UserRepository: UserService = {

    // ----------------------------------------------------
    // 2. Método SAVE (Dominio -> Persistencia)
    // ----------------------------------------------------
    async save(user: User): Promise<void> {
        // 🚨 USAMOS MAPPER: Convertimos el objeto de dominio a la entidad de TypeORM
        const userEntity = userMapper.toPersistence(user);

        // El método .create() de TypeORM NO es necesario si ya usaste el mapper.
        // Simplemente guardamos la entidad resultante:
        await userRepository.save(userEntity);
    },

    // ----------------------------------------------------
    // 3. Método FIND BY ID (Persistencia -> Dominio)
    // ----------------------------------------------------
    async findById(id: string): Promise<User | null> {
        // En TypeORM, el ID de la entidad es un número (o el tipo que uses),
        // pero .findOneBy acepta el tipo 'any' o un objeto, por lo que convertimos
        // el id de string (dominio) a number (DB) en el mapper.
        const userEntity = await userRepository.findOneBy({ id: parseInt(id) as any });

        // 🚨 USAMOS MAPPER: Convertimos la entidad a objeto de dominio, o null si no se encuentra
        return userEntity ? userMapper.toDomain(userEntity) : null;
    },

    // ----------------------------------------------------
    // 4. Método UPDATE (Dominio -> Persistencia)
    // ----------------------------------------------------
    async update(user: User): Promise<void> {
        // 🚨 USAMOS MAPPER: Convertimos User a UserEntity antes de guardarlo. 
        // TypeORM usará el ID (que debe existir) para hacer un UPDATE.
        const userEntity = userMapper.toPersistence(user);
        await userRepository.save(userEntity);
    },

    // ----------------------------------------------------
    // 5. Método DEACTIVATE (Específico de DB)
    // ----------------------------------------------------
    async deactivate(id: string): Promise<void> {
        // Esto funciona bien porque solo requiere el ID y una columna de la DB.
        // Convertimos el id de string a number para TypeORM.
        await userRepository.update(parseInt(id), { isActive: false });
    },

    // ----------------------------------------------------
    // 6. Método FIND BY ROLE (Persistencia -> Dominio)
    // ----------------------------------------------------
    async findByRole(role: any): Promise<User[]> {
        // La consulta de la DB
        const userEntities = await userRepository.findBy({ role });

        // 🚨 USAMOS MAPPER: Mapeamos el array de entidades a un array de tipos User
        return userEntities.map(userMapper.toDomain);
    },
    
    async findByEmail(email: string): Promise<User | null> {
        const userEntity = await userRepository.findOneBy({ email });
        return userEntity ? userMapper.toDomain(userEntity) : null;
    }
};