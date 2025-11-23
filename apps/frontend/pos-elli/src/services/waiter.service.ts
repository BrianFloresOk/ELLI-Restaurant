import { API_ROUTES } from "../config/api_routes";
import api from "./api";

export const waiterService = {
    getCategoriesProducts: async () => {
        const response = await api.get(API_ROUTES.WAITERS.CATEGORIES, { withCredentials: true })
        return response.data
    },

    getProducts: async () => {
        const response = await api.get(API_ROUTES.WAITERS.PRODUCTS, { withCredentials: true })
        return response.data
    }
}