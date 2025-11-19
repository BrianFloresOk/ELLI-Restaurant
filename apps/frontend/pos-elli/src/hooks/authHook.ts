import { useState } from "react";
import { authService } from "../services/authService";

export const useAuthHook = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login(email, password);
            if (response.success) {
                setIsAuthenticated(true);
            }
            
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return { isAuthenticated, login };
}