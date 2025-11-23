import { waiterService } from "../services/waiter.service"
import { useEffect, useState } from "react";


export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await waiterService.getProducts();
            setProducts(data);
        } catch (err) {
            console.log(err)
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        error,
        refetch: fetchProducts,
    };
}
