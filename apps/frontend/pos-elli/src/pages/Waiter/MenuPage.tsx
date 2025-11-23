import { useState } from "react";
import CategoryFilter from "../../components/ui/CategoryFilter";
import { useCategoriesProducts } from "../../hooks/useCategories";
import { LoadingSpinnerWithText } from "../../components/ui/LoadingSpinner";
import ProductList from "../../components/containers/ProductList";
import { useProducts } from "../../hooks/useProducts";

export default function MenuPage() {
    const { categories, loading, error } = useCategoriesProducts();
    const { products } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const handleCategoryChange = (categoryId: number | null) => {
        setSelectedCategory(categoryId);
    };

    if (loading) return <LoadingSpinnerWithText text="Cargando.." />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6 flex flex-col gap-6">
            {/* Título principal */}
            <header className="space-y-1">
                <h2 className="text-3xl font-bold text-foreground tracking-wide">
                    Menú
                </h2>
                <p className="text-muted-foreground text-sm">
                    Seleccioná una categoría para explorar los productos disponibles.
                </p>
            </header>

            {/* Filtros */}
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            {/* Lista de productos */}
            <ProductList
                products={products}
                selectedCategory={selectedCategory}
            />
        </div>
    );
}
