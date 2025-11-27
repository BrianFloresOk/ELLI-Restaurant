import "reflect-metadata";
import "dotenv/config";
import app from "./app";
import { dataSource } from "./database/data-source";
import { Config } from "./config/config"

const PORT = Config.server.PORT;

const startServer = async () => {
    try {
        await dataSource.initialize();
        console.log("Conexión a la base de datos establecida exitosamente.");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server corriendo en http://localhost:${PORT}/api/v1`);
        });
    } catch (error) {
        console.error("Error durante la inicialización:", error);
        process.exit(1);
    }
};

startServer();
