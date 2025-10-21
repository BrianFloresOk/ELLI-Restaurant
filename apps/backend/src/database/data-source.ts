import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import "dotenv/config";
import { Config } from "../config/config";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const dataSource = new DataSource({
    type: Config.db.DB_TYPE as any,
    host: Config.db.DB_HOST,
    port: Config.db.DB_PORT,
    username: Config.db.DB_USER,
    password: Config.db.DB_PASSWORD,
    database: Config.db.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname, "entities", "**", "*.{ts,js}")],
    migrations: [path.join(__dirname, "migrations", "**", "*.{ts,js}")],
});
