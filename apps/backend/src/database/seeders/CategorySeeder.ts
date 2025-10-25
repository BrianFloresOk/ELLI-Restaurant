import { DataSource } from 'typeorm';
import { CategoryEntity } from "../entities/CategoryEntity";

const categories = [
    { name: "Entradas", description: "Aperitivos y entrantes para compartir." },
    { name: "Platos Principales", description: "Platos principales para disfrutar." },
    { name: "Postres", description: "Deliciosos postres para endulzar la comida." },
    { name: "Minutas", description: "Minutas y comidas rápidas." },
    { name: "Especialidades", description: "Platos especiales de la casa." },
    { name: "Vinos", description: "Selección de vinos nacionales e internacionales." },
    { name: "Cervezas", description: "Variedad de cervezas artesanales y comerciales." },
    { name: "Cócteles", description: "Cócteles clásicos y de autor." },
    { name: "Bebidas sin alcohol", description: "Refrescos, jugos y bebidas saludables." },
    { name: "Cafetería", description: "Selección de cafés y tés especiales." },
    { name: "Comida vegetariana", description: "Opciones vegetarianas y veganas." },
    { name: "Comida para niños", description: "Platos diseñados para los más pequeños." },
    { name: "Pizzas", description: "Variedad de pizzas con diferentes ingredientes." },
    { name: "Pastas", description: "Diferentes tipos de pastas y salsas." },
    { name: "Ensaladas", description: "Ensaladas frescas y saludables." },
    { name: "Sopas", description: "Sopas calientes y frías para todas las estaciones." },
    { name: "Mariscos", description: "Platos elaborados con mariscos frescos." },
    { name: "Carnes", description: "Selección de carnes a la parrilla y al horno." },
    { name: "Salsas y acompañamientos", description: "Variedad de salsas y guarniciones." },

];

export class CategorySeeder {
    public async run(dataSource: DataSource): Promise<void> {
        const categoryRepository = dataSource.getRepository(CategoryEntity);
        const createdCategories = [];

        for (const categoryData of categories) {
            const existingCategory = await categoryRepository.findOne({
                where: { name: categoryData.name }
            });
            if (!existingCategory) {
                const newCategory = categoryRepository.create(categoryData);
                await categoryRepository.save(newCategory);
                createdCategories.push(newCategory.name);
            }
        }
    }
}