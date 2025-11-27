import { dataSource } from "../data-source"
import { CategorySeeder } from '../seeders/CategorySeeder';
import { ProductSeeder } from "../seeders/ProductSeeder";
import { TableSeeder } from '../seeders/TableSeeder';
import { UserSeeder } from "../seeders/UserSeeder";

async function runSeeders() {

    const dataConnection = await dataSource.initialize();
    console.log("Conexión de TypeORM establecida.");

    try {
        const categorySeeder = new CategorySeeder();
        await categorySeeder.run(dataConnection);

        const tableSeeder = new TableSeeder();
        await tableSeeder.run(dataConnection);

        const productSeeder = new ProductSeeder();
        await productSeeder.run(dataConnection);

        const userSeeder = new UserSeeder();
        await userSeeder.run(dataConnection)

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