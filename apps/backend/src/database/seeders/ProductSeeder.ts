import { DataSource } from "typeorm";
import { ProductEntity } from "../entities/ProductEntity";
import { CategoryEntity } from "../entities/CategoryEntity";

export class ProductSeeder {
    public async run(dataSource: DataSource): Promise<void> {
        const productRepo = dataSource.getRepository(ProductEntity);
        const categoryRepo = dataSource.getRepository(CategoryEntity);

        const products = [
            // Entradas
            {
                name: "Carpaccio de Lomo",
                description: "Finas láminas de lomo con rúcula, parmesano y aceite de trufa.",
                price: 8500,
                type: "DISH",
                category: "Entradas"
            },
            {
                name: "Langostinos Crocantes",
                description: "Langostinos rebozados con salsa teriyaki.",
                price: 9200,
                type: "DISH",
                category: "Entradas"
            },

            // Platos Principales
            {
                name: "Ribeye Angus Premium",
                description: "Corte grillado con salsa de vino malbec y vegetales orgánicos.",
                price: 18500,
                type: "DISH",
                category: "Platos Principales"
            },
            {
                name: "Risotto de Hongos Porcini",
                description: "Risotto cremoso con porcini y aceite de trufa.",
                price: 16500,
                type: "DISH",
                category: "Platos Principales"
            },

            // Postres
            {
                name: "Volcán de Chocolate Belga",
                description: "Acompañado con helado artesanal de vainilla.",
                price: 7000,
                type: "DISH",
                category: "Postres"
            },
            {
                name: "Créme Brûlée de Vainilla",
                description: "Clásico francés con azúcar caramelizada.",
                price: 6800,
                type: "DISH",
                category: "Postres"
            },

            // Vinos (DRINK)
            {
                name: "Malbec Reserva 2019",
                description: "Vino tinto de perfil aterciopelado.",
                price: 12000,
                type: "DRINK",
                stock: 40,
                category: "Vinos"
            },
            {
                name: "Cabernet Sauvignon Gran Cosecha",
                description: "Notas de roble y frutos rojos.",
                price: 14500,
                type: "DRINK",
                stock: 25,
                category: "Vinos"
            },

            // Cócteles (DRINK)
            {
                name: "Negroni Clásico",
                description: "Ginebra, vermú rosso y Campari.",
                price: 6000,
                type: "DRINK",
                stock: 50,
                category: "Cócteles"
            },
            {
                name: "Old Fashioned Ahumado",
                description: "Whisky premium con perfumado ahumado.",
                price: 6500,
                type: "DRINK",
                stock: 35,
                category: "Cócteles"
            },

            // Cafetería (DRINK)
            {
                name: "Café Espresso Doble",
                description: "Granos seleccionados 100% arábica.",
                price: 2500,
                type: "DRINK",
                stock: 100,
                category: "Cafetería"
            },
            {
                name: "Latte Vainilla",
                description: "Café con leche vaporizada y vainilla natural.",
                price: 3200,
                type: "DRINK",
                stock: 80,
                category: "Cafetería"
            },
            {
                name: "Tártaro de Salmón Premium",
                description: "Salmón fresco cortado a cuchillo con palta, lima y chips crocantes.",
                price: 9800,
                type: "DISH",
                category: "Entradas"
            },
            {
                name: "Foie Gras Sellado",
                description: "Foie gras francés con reducción de oporto y brioche tostado.",
                price: 14500,
                type: "DISH",
                category: "Entradas"
            },

            // Platos Principales
            {
                name: "Salmón Noruego en Costra de Hierbas",
                description: "Acompañado con puré de coliflor trufado.",
                price: 17800,
                type: "DISH",
                category: "Platos Principales"
            },
            {
                name: "Pato Confitado",
                description: "Pierna de pato cocida lentamente con papas a la lyonnaise.",
                price: 19200,
                type: "DISH",
                category: "Platos Principales"
            },
            {
                name: "Cordero Patagónico Braseado",
                description: "Cocción de 12 horas con puré de batata ahumado.",
                price: 20500,
                type: "DISH",
                category: "Platos Principales"
            },

            // Minutas
            {
                name: "Suprema Maryland Gourmet",
                description: "Con panceta crocante, arvejas y bananas fritas.",
                price: 11500,
                type: "DISH",
                category: "Minutas"
            },
            {
                name: "Lomo a la Mostaza Antigua",
                description: "Medallones tiernos con salsa de mostaza Dijon.",
                price: 12800,
                type: "DISH",
                category: "Minutas"
            },

            // Postres
            {
                name: "Tiramisú Italiano Tradicional",
                description: "Con mascarpone auténtico y café espresso.",
                price: 7200,
                type: "DISH",
                category: "Postres"
            },
            {
                name: "Cheesecake de Frutos Rojos",
                description: "Base de galletas con coulis artesanal.",
                price: 6900,
                type: "DISH",
                category: "Postres"
            },

            // Especialidades
            {
                name: "Ojo de Bife Dry Aged 45 días",
                description: "Carne madurada para un sabor profundo e intenso.",
                price: 23500,
                type: "DISH",
                category: "Especialidades"
            },
            {
                name: "Paella Mediterránea",
                description: "Con mariscos frescos, azafrán español y arroz bomba.",
                price: 21500,
                type: "DISH",
                category: "Especialidades"
            },

            // Vinos
            {
                name: "Chardonnay Reserva 2020",
                description: "Vino blanco suave con notas de manteca y durazno.",
                price: 11000,
                stock: 40,
                type: "DRINK",
                category: "Vinos"
            },
            {
                name: "Espumante Brut Nature",
                description: "Frescura y fineza en cada burbuja.",
                price: 13000,
                stock: 35,
                type: "DRINK",
                category: "Vinos"
            },

            // Cervezas
            {
                name: "Cerveza IPA Artesanal",
                description: "Lúpulo intenso y final cítrico.",
                price: 3500,
                stock: 90,
                type: "DRINK",
                category: "Cervezas"
            },
            {
                name: "Cerveza Lager Premium",
                description: "Suave, fresca, con espuma persistente.",
                price: 3200,
                stock: 100,
                type: "DRINK",
                category: "Cervezas"
            },

            // Bebidas sin alcohol
            {
                name: "Limonada de Menta y Jengibre",
                description: "Refrescante, natural y sin azúcar añadida.",
                price: 2800,
                stock: 120,
                type: "DRINK",
                category: "Bebidas sin alcohol"
            },
            {
                name: "Jugo Natural de Naranja",
                description: "Exprimido en el momento.",
                price: 2500,
                stock: 110,
                type: "DRINK",
                category: "Bebidas sin alcohol"
            },

            // Cafetería
            {
                name: "Capuccino Italiano",
                description: "Café intenso con espuma cremosa.",
                price: 3000,
                stock: 70,
                type: "DRINK",
                category: "Cafetería"
            },
            {
                name: "Flat White",
                description: "Espresso doble con leche microespumada.",
                price: 3200,
                stock: 65,
                type: "DRINK",
                category: "Cafetería"
            },

            // Pastas
            {
                name: "Ravioles de Ricota y Espinaca",
                description: "Con salsa de manteca y salvia.",
                price: 9800,
                type: "DISH",
                category: "Pastas"
            },
            {
                name: "Tagliatelle al Funghi",
                description: "Pasta casera con hongos de temporada.",
                price: 11200,
                type: "DISH",
                category: "Pastas"
            },

            // Ensaladas
            {
                name: "Ensalada Caesar Premium",
                description: "Con pollo grillado, croutons artesanales y parmesano rallado.",
                price: 7500,
                type: "DISH",
                category: "Ensaladas"
            },
            {
                name: "Ensalada Mediterránea",
                description: "Tomate, aceitunas, queso feta y oliva extra virgen.",
                price: 7000,
                type: "DISH",
                category: "Ensaladas"
            },

            // Mariscos
            {
                name: "Pulpo a la Gallega",
                description: "Pulpo tierno con pimentón ahumado y papas.",
                price: 18500,
                type: "DISH",
                category: "Mariscos"
            },
            {
                name: "Camarones al Ajillo",
                description: "Salteados en aceite de oliva y ajo fresco.",
                price: 17500,
                type: "DISH",
                category: "Mariscos"
            },

            // Carnes
            {
                name: "Bife de Chorizo Premium",
                description: "Con chimichurri casero y papas rusticas.",
                price: 16500,
                type: "DISH",
                category: "Carnes"
            },
            {
                name: "Asado Bandera",
                description: "Cocción lenta con pure de papas cremoso.",
                price: 17800,
                type: "DISH",
                category: "Carnes"
            },

            // Sopas
            {
                name: "Sopa de Cebolla Gratinada",
                description: "Clásico francés con queso gratinado.",
                price: 6500,
                type: "DISH",
                category: "Sopas"
            },
            {
                name: "Crema de Calabaza",
                description: "Calabaza dulce con toque de jengibre.",
                price: 6200,
                type: "DISH",
                category: "Sopas"
            },

            // Comida para niños
            {
                name: "Mini Hamburguesa Casera",
                description: "Carne de alta calidad con papas.",
                price: 5200,
                type: "DISH",
                category: "Comida para niños"
            },
            {
                name: "Ñoquis con Salsa Suave",
                description: "Ideal para los más chicos.",
                price: 4800,
                type: "DISH",
                category: "Comida para niños"
            }
        ];

        for (const p of products) {
            const category = await categoryRepo.findOne({ where: { name: p.category } });
            if (!category) {
                console.warn(`⚠️ No se encontró la categoría ${p.category}, saltando producto.`);
                continue;
            }

            // Construimos productData respetando DRINK / DISH
            const productData: Partial<ProductEntity> = {
                name: p.name,
                description: p.description,
                price: p.price,
                type: p.type,
                categoryId: category.id
            };

            if (p.type === "DRINK") {
                productData.stock = p.stock ?? 0;
            } else {
                productData.stock = 0;
            }

            const exists = await productRepo.findOne({
                where: { name: p.name }
            });

            if (!exists) {
                const newProduct = productRepo.create(productData);
                await productRepo.save(newProduct);
            }
        }
    }
}
