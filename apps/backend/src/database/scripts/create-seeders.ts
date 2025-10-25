import { dataSource } from "../data-source"
import { CategorySeeder } from '../seeders/CategorySeeder';
import { TableSeeder } from '../seeders/TableSeeder';

async function runSeeders() {

    const dataConnection = await dataSource.initialize();
    console.log("Conexión de TypeORM establecida.");

    try {
        const categorySeeder = new CategorySeeder();
        await categorySeeder.run(dataConnection);

        const tableSeeder = new TableSeeder();
        await tableSeeder.run(dataConnection);

    } catch (error) {
        console.error("❌ Error al ejecutar los seeders:", error);
    } finally {
        // 3. Cerrar la conexión
        await dataSource.destroy();
        console.log("Conexión de TypeORM cerrada.");
        process.exit(0);
    }
}

runSeeders();