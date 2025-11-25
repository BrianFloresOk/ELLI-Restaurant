import { Utensils, CupSoda } from "lucide-react";

export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: string;
    type: string;
    categoryId: number;
}

interface ProductListProps {
    products: Product[];
    selectedCategory: number | null;
    onSelectProduct?: (product: Product) => void;
}

export default function ProductList({
    products,
    selectedCategory,
    onSelectProduct,
}: ProductListProps) {
    const filteredProducts =
        selectedCategory === null
            ? products
            : products.filter((p) => p.categoryId === selectedCategory);

    if (filteredProducts.length === 0) {
        return (
            <div className="mt-6 p-6 text-center border border-border rounded-2xl bg-muted text-muted-foreground">
                No hay productos para esta categoría.
            </div>
        );
    }

    return (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
                <button
                    key={product.id}
                    onClick={() => onSelectProduct?.(product)}
                    className="
                        bg-card border border-border rounded-2xl p-4
                        shadow-sm hover:shadow-md transition-all duration-200
                        text-left flex flex-col gap-2
                    "
                >
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-card-foreground capitalize">
                            {product.name}
                        </h4>

                        {product.type === "DRINK" ? (
                            <CupSoda className="w-5 h-5 text-muted-foreground" />
                        ) : (
                            <Utensils className="w-5 h-5 text-muted-foreground" />
                        )}
                    </div>

                    {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                        </p>
                    )}

                    <p className="text-lg font-bold text-accent">
                        ${Number(product.price).toLocaleString()}
                    </p>
                </button>
            ))}
        </div>
    );
}
