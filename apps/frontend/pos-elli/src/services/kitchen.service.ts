import { API_ROUTES } from "../config/api_routes";
import api from "./api";

export const kitchenService = {
    viewAllComands: async () => {
        const response = await api.get(API_ROUTES.KITCHEN.VIEW_COMANDS, { withCredentials: true })
        return response.data
    }
}