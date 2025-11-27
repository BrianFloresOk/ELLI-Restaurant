import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import * as bcrypt from "bcryptjs";

export class UserSeeder {
    public async run(dataSource: DataSource): Promise<void> {
        const userRepository = dataSource.getRepository(UserEntity);

        // Usuarios base
        const users = [
            {
                name: "Administrador General",
                email: "admin@elli.com",
                role: "ADMIN",
                password: "admin123"
            },
            {
                name: "Juan Pérez",
                email: "juan.perez@elli.com",
                role: "WAITER",
                password: "password123"
            },
            {
                name: "María González",
                email: "maria.gonzalez@elli.com",
                role: "CASHIER",
                password: "password123"
            },
            {
                name: "Lucas Álvarez",
                email: "lucas.alvarez@elli.com",
                role: "WAITER",
                password: "password123"
            },
            {
                name: "Carla Rodríguez",
                email: "carla.rodriguez@elli.com",
                role: "CASHIER",
                password: "password123"
            },
            {
                name: "Pedro Romero",
                email: "pedro.romero@elli.com",
                role: "WAITER",
                password: "password123"
            }
        ];

        for (const userData of users) {
            const exists = await userRepository.findOne({
                where: { email: userData.email }
            });

            if (!exists) {
                const hashedPassword = await bcrypt.hash(userData.password, 10);

                const newUser = userRepository.create({
                    ...userData,
                    password: hashedPassword,
                    isActive: true
                });

                await userRepository.save(newUser);
            }
        }

        console.log("✔ Usuarios creados correctamente");
    }
}
