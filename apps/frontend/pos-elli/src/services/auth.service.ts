import { API_ROUTES } from "../config/api_routes";
import api from "./api";

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: string[];
}

export const authService = {
    login: async (email: string, password: string) => {
        const response = await api.post<ApiResponse<{ accessToken?: string }>>(
            API_ROUTES.AUTH.LOGIN,
            { email, password },
            { withCredentials: true }
        );
        return response.data;
    },

    refresh: async (): Promise<ApiResponse<{ accessToken?: string }>> => {
        try {
            const response = await api.post<ApiResponse<{ accessToken?: string }>>(
                API_ROUTES.AUTH.REFRESH_TOKEN,
                {},
                { withCredentials: true }
            );
            return response.data;

        } catch (error) {
            console.error("Error al intentar refrescar el token:", error);
            return {
                success: false,
                message: "Fallo la validación de la sesión o token expirado.",
                data: {},
            };
        }
    },

    logout: async () => {
        const response = await api.post(API_ROUTES.AUTH.LOGOUT, {}, { withCredentials: true });
        return response.data;
    },
};
