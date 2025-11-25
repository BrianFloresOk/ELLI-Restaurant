import { API_ROUTES } from "../config/api_routes";
import api from "./api";


export const orderService = {

    createOrderService: async (tableId: number, waiterId: number) => {
        const payload = {
            tableId,
            waiterId
        }
        const response = await api.post(API_ROUTES.ORDERS.CREATE, payload, { withCredentials: true })
        return response.data;
    },

    closeOrderService: async (orderId: string) => {
        const response = await api.put(API_ROUTES.ORDERS.CLOSE_ORDER(orderId), { withCredentials: true })
        return response.data;
    },

    addItemsAtOrder: async (
        orderId: string,
        productId: number,
        quantity: number
    ) => {

        const payload = {
            productId,
            quantity
        }

        const response = await api.patch(API_ROUTES.ORDERS.MODIFY_ORDER(orderId), payload, { withCredentials: true });
        return response.data;
    },

    viewDetailOrder: async (orderId: string) => {
        const response = await api.get(API_ROUTES.ORDERS.GET_DETAILS(orderId), { withCredentials: true })
        return response.data;
    },

    sendToKitchenService: async (orderId: string, waiterId: number) => {
        const payload = {
            waiterId
        }

        const response = await api.patch(API_ROUTES.ORDERS.SEND_TO_KITCHEN(orderId), payload, { withCredentials: true })
        return response.data;
    },

    orderReadyService: async (orderId: string, waiterId: number) => {
        const response = await api.patch(API_ROUTES.ORDERS.ORDER_COMPLETED(orderId), waiterId, { withCredentials: true })
        return response.data;
    }

}