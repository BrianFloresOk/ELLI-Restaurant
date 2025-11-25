import { useCallback, useEffect, useState } from "react";
import { tableService } from "../services/table.service";
import { orderService } from "../services/order.service";

interface OrderItemDetail {
    product: string;
    quantity: number;
    subtotal: number;
    status: string;
}

interface OrderDetail {
    orderNumber: number;
    tableId: number;
    waiter: string;
    status: string;
    orderDate: string;
    orderItems: OrderItemDetail[];
}

interface UseOrderDetailsReturn {
    order: OrderDetail | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useOrder(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [order, setOrder] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrder = async () => {
        try {
            setLoading(true);

            const response = await tableService.getOrderTable(id);
            setOrder(response.data || null);

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Error desconocido");
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return { order, loading, error, refetch: fetchOrder };
}


export const useCreateOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createOrder = async (payload: { tableId: number, waiterId: number }) => {
        try {
            setLoading(true);
            const response = await orderService.createOrderService(payload.tableId, payload.waiterId);

            return response;

        } catch (error) {
            console.error(error)
            setError("Ocurrió un error");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, createOrder };
}

export const useCloseOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const closeOrder = async (orderId: string) => {
        try {
            setLoading(true);
            const response = await orderService.closeOrderService(orderId);
            return response;

        } catch (error) {
            console.error(error)
            setError("Ocurrió un error");
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { loading, error, closeOrder };
};

export const useAddOrderItem = () => {
    const [loading, setLoading] = useState(false);

    const addItem = async (orderId: string, productId: number, quantity = 1) => {
        try {
            setLoading(true);

            const res = await orderService.addItemsAtOrder(orderId, productId, quantity)
            return res;
        } catch (err) {
            console.log(err)
            return { success: false, message: "Error al agregar producto" };
        } finally {
            setLoading(false);
        }
    };

    return { addItem, loading };
};

export function useOrderDetails(orderId: string | null): UseOrderDetailsReturn {
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOrderDetails = useCallback(async () => {
        // Si no hay ID o el ID no es un número válido, reseteamos todo.
        if (!orderId || isNaN(Number(orderId))) {
            setOrder(null);
            setError(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await orderService.viewDetailOrder(orderId);
            setOrder(response.data);
        } catch (err) {
            console.log(err)
            setError("Error al obtener la orden");
        } finally {
            setLoading(false);
        }
    }, [orderId]);

    useEffect(() => {
        fetchOrderDetails();
    }, [fetchOrderDetails]);

    return {
        order,
        loading,
        error,
        refetch: fetchOrderDetails,
    };
}


export const useSendToKitchen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendToKitchen = useCallback(async (orderId: string, waiterId: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await orderService.sendToKitchenService(orderId, waiterId);
            return response
        } catch (err) {
            console.log(err)
            setError("Error al enviar la orden a cocina");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        sendToKitchen,
        loading,
        error,
    };
}

export const useOrderAsReady = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendHall = useCallback(async (orderId: string, waiterId: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await orderService.orderReadyService(orderId, waiterId);
            return response
        } catch (err) {
            console.log(err)
            setError("Error al enviar la orden a cocina");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        sendHall,
        loading,
        error,
    };
}
