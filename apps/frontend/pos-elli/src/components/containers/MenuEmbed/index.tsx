import { useState } from "react";
import { useCategoriesProducts } from "../../../hooks/useCategories";
import { useProducts } from "../../../hooks/useProducts";
import { LoadingSpinnerWithText } from "../../ui/LoadingSpinner";
import CategoryFilter from "../../ui/CategoryFilter";
import ProductList from "../ProductList";

interface MenuEmbedProps {
    onAddProduct: (productId: number) => void;
}

export default function MenuEmbed({ onAddProduct }: MenuEmbedProps) {
    const { categories, loading, error } = useCategoriesProducts();
    const { products } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    if (loading) return <LoadingSpinnerWithText text="Cargando.." />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col gap-4 p-2">

            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            <ProductList
                products={products}
                selectedCategory={selectedCategory}
                onSelectProduct={(product) => onAddProduct(product.id)}
            />
        </div>
    );
}
