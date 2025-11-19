import { apiRequest } from "./apiService";
import { API_ROUTES } from "../config/api_routes"

export const authService = {
    login: async (email: string, password: string) => {
        return await apiRequest<{ token: string }>({
            method: "POST",
            url: API_ROUTES.AUTH.LOGIN,
            data: { email, password },
        });
    },
};
