import { tableService } from "../services/table.service"
import { useEffect, useState } from "react";


export function useTables() {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTables = async () => {
        try {
            setLoading(true);
            const { data } = await tableService.getTables();
            setTables(data.tables);
        } catch (err) {
            console.log(err)
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    return {
        tables,
        loading,
        error,
        refetch: fetchTables,
    };
}
