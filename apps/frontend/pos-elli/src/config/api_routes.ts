const BASE = import.meta.env.VITE_API_BASE_URL

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${BASE}/auth/login`,
        LOGOUT: `${BASE}/auth/logout`,
        //REFRESH_TOKEN: '/auth/refresh-token',
    },

    ORDERS: {
        CREATE: `${BASE}/order`,
        LIST: `${BASE}/order`,
        GET_DETAILS: (orderId: string) => `${BASE}/order/${orderId}`,
        SEND_TO_KITCHEN: (orderId: string) => `${BASE}/order/${orderId}/send`,
        MODIFY_ORDER: (orderId: string) => `${BASE}/order/${orderId}/items`,
        ORDER_COMPLETED: (orderId: string) => `${BASE}/order/${orderId}/complete`,
        CLOSE_ORDER: (orderId: string) => `${BASE}/order/${orderId}/close`,
    },
}