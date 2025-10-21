import "reflect-metadata";
import { DataSource } from "typeorm";
import { Config } from "../../config/config";

async function createDatabase() {
    const tmpDataSource = new DataSource({
        type: Config.db.DB_TYPE as any,
        host: Config.db.DB_HOST,
        port: Config.db.DB_PORT,
        username: Config.db.DB_USER,
        password: Config.db.DB_PASSWORD,
    });

    await tmpDataSource.initialize();

    await tmpDataSource.query(`CREATE DATABASE ${Config.db.DB_NAME};`);
    console.log(`Base de datos "${Config.db.DB_NAME}" creada exitosamente`);
    await tmpDataSource.destroy();
}

createDatabase().catch((err) => {
    console.error("Error al crear la base de datos:", err);
});
