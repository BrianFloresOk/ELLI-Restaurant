import { waiterService } from "../services/waiter.service"
import { useEffect, useState } from "react";


export function useCategoriesProducts() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const { data } = await waiterService.getCategoriesProducts();
            setCategories(data);
        } catch (err) {
            console.log(err)
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        error,
        refetch: fetchCategories,
    };
}
