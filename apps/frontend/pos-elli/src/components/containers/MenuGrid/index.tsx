import { useState } from 'react';
import { Search, Utensils, Wine } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    type: 'DISH' | 'DRINK';
    categoryId: number;
}

interface Category {
    id: number;
    name: string;
    description: string | null;
}

interface MenuGridProps {
    products: Product[];
    categories: Category[];
    onAddToOrder: (product: Product) => void;
}

const MenuGrid = ({ products, categories, onAddToOrder }: MenuGridProps) => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<'ALL' | 'DISH' | 'DRINK'>('ALL');

    // Filtrar productos
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === null || product.categoryId === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'ALL' || product.type === selectedType;

        return matchesCategory && matchesSearch && matchesType;
    });

    // Agrupar productos por categoría
    const productsByCategory = filteredProducts.reduce((acc, product) => {
        const category = categories.find(cat => cat.id === product.categoryId);
        const categoryName = category?.name || 'Sin Categoría';

        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    // Función para formatear precio
    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(parseFloat(price));
    };

    // Obtener icono según el tipo
    const getTypeIcon = (type: 'DISH' | 'DRINK') => {
        switch (type) {
            case 'DRINK':
                return <Wine className="w-4 h-4" />;
            case 'DISH':
                return <Utensils className="w-4 h-4" />;
            default:
                return <Utensils className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header y Filtros */}
            <div className="bg-card rounded-2xl shadow-card border border-border p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-card-foreground">Menú</h1>
                        <p className="text-muted-foreground mt-1">
                            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} disponible{filteredProducts.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Barra de búsqueda */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-card-foreground placeholder-muted-foreground"
                        />
                    </div>
                </div>

                {/* Filtros rápidos */}
                <div className="flex flex-wrap gap-4 mt-6">
                    {/* Filtro por tipo */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedType('ALL')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm border ${selectedType === 'ALL'
                                    ? 'bg-accent text-accent-foreground border-accent shadow-md'
                                    : 'bg-card text-card-foreground border-border hover:bg-muted hover:shadow-md'
                                }`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setSelectedType('DISH')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm border flex items-center gap-2 ${selectedType === 'DISH'
                                    ? 'bg-accent text-accent-foreground border-accent shadow-md'
                                    : 'bg-card text-card-foreground border-border hover:bg-muted hover:shadow-md'
                                }`}
                        >
                            <Utensils className="w-4 h-4" />
                            Platos
                        </button>
                        <button
                            onClick={() => setSelectedType('DRINK')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm border flex items-center gap-2 ${selectedType === 'DRINK'
                                    ? 'bg-accent text-accent-foreground border-accent shadow-md'
                                    : 'bg-card text-card-foreground border-border hover:bg-muted hover:shadow-md'
                                }`}
                        >
                            <Wine className="w-4 h-4" />
                            Bebidas
                        </button>
                    </div>

                    {/* Filtro por categoría */}
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm border ${selectedCategory === null
                                    ? 'bg-accent text-accent-foreground border-accent shadow-md'
                                    : 'bg-card text-card-foreground border-border hover:bg-muted hover:shadow-md'
                                }`}
                        >
                            Todas
                        </button>
                        {categories.slice(0, 5).map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm border ${selectedCategory === category.id
                                        ? 'bg-accent text-accent-foreground border-accent shadow-md'
                                        : 'bg-card text-card-foreground border-border hover:bg-muted hover:shadow-md'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid de Productos */}
            <div className="space-y-8">
                {Object.keys(productsByCategory).length > 0 ? (
                    Object.entries(productsByCategory).map(([categoryName, categoryProducts]) => (
                        <div key={categoryName} className="space-y-4">
                            {/* Header de categoría */}
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-accent rounded-full"></div>
                                <h2 className="text-2xl font-bold text-card-foreground">
                                    {categoryName}
                                </h2>
                                <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">
                                    {categoryProducts.length}
                                </span>
                            </div>

                            {/* Grid de productos */}
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                                {categoryProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-card rounded-2xl shadow-card border border-border p-4 hover:shadow-elegant transition-all duration-300 group cursor-pointer"
                                        onClick={() => onAddToOrder(product)}
                                    >
                                        {/* Header del producto */}
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-card-foreground text-lg leading-tight group-hover:text-accent transition-colors duration-200">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {getTypeIcon(product.type)}
                                                    <span className="text-xs text-muted-foreground capitalize">
                                                        {product.type === 'DISH' ? 'Plato' : 'Bebida'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Descripción */}
                                        {product.description && (
                                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                                                {product.description}
                                            </p>
                                        )}

                                        {/* Precio y acción */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-accent">
                                                {formatPrice(product.price)}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onAddToOrder(product);
                                                }}
                                                className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform group-hover:scale-105"
                                            >
                                                Agregar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    /* Estado vacío */
                    <div className="bg-card rounded-2xl shadow-card border border-border p-12 text-center">
                        <Utensils className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-xl font-semibold text-card-foreground mb-2">
                            No se encontraron productos
                        </h3>
                        <p className="text-muted-foreground">
                            {searchTerm || selectedCategory || selectedType !== 'ALL'
                                ? 'Intenta ajustar los filtros de búsqueda'
                                : 'No hay productos disponibles en este momento'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuGrid;