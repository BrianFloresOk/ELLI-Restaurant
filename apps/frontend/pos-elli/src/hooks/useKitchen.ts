import { kitchenService } from "../services/kitchen.service";
import { useEffect, useState } from "react";

export interface OrderItemInfo {
    product: string;
    quantity: number;
    subtotal: number;
    status: string;
}

export interface OrderInfo {
    orderNumber: number;
    tableId: number;
    waiter: string;
    status: string;
    orderDate: string;
    orderItems: OrderItemInfo[];
}

export interface OrdersResponse {
    success: boolean;
    message: string;
    data: OrderInfo[];
}
export function useViewAllComandsKitchen() {
    const [orders, setOrders] = useState<OrderInfo[] | null>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await kitchenService.viewAllComands()
            setOrders(data);
        } catch (err) {
            console.log(err)
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        loading,
        error,
        refetch: fetchOrders,
    };
}
