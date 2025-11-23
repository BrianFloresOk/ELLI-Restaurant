import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    description: string | null;
}

interface CategoryFilterProps {
    categories: Category[];
    onCategoryChange: (categoryId: number | null) => void;
    selectedCategory: number | null;
}

const CategoryFilter = ({
    categories,
    onCategoryChange,
    selectedCategory
}: CategoryFilterProps) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const scroll = (direction: 'left' | 'right') => {
        const container = document.getElementById('category-scroll-container');
        if (container) {
            const scrollAmount = 200;
            const newPosition = direction === 'right'
                ? scrollPosition + scrollAmount
                : scrollPosition - scrollAmount;

            container.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };

    return (
        <div className="relative bg-card rounded-2xl shadow-card border border-border p-4">
            {/* Botones de navegación */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-card-foreground">
                    Categorías
                </h3>

                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Contenedor de categorías con scroll */}
            <div className="relative">
                <div
                    id="category-scroll-container"
                    className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {/* Botón "Todas" */}
                    <button
                        onClick={() => onCategoryChange(null)}
                        className={`shrink-0 px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm border ${selectedCategory === null
                                ? 'bg-accent text-accent-foreground border-accent shadow-md'
                                : 'bg-card text-card-foreground border-border hover:bg-muted hover:shadow-md'
                            }`}
                    >
                        Todas
                    </button>

                    {/* Botones de categorías */}
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`shrink-0 px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm border ${selectedCategory === category.id
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
    );
};

export default CategoryFilter;