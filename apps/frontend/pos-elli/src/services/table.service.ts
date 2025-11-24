import { API_ROUTES } from "../config/api_routes";
import api from "./api";

export const tableService = {

    getTables: async () => {
        const response = await api.get(API_ROUTES.WAITERS.VIEW_TABLES, { withCredentials: true })
        return response.data
    },
}