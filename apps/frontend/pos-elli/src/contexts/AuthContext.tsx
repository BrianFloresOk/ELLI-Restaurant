import React, { createContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import { authService } from "../services/auth.service";
import { setAccessToken } from "../services/authToken.service";

interface PayloadToken {
    id: number;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

interface AuthContextType {
    user: PayloadToken | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<PayloadToken | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = !!user;

    const login = async (email: string, password: string) => {
        setError(null);
        try {
            const resp = await authService.login(email, password);
            if (!resp.success) throw new Error(resp.message || "Login failed");

            const token = resp.data?.accessToken;
            if (!token) throw new Error("No access token returned from server");

            setAccessToken(token);

            const decoded = jwtDecode<PayloadToken>(token);
            setUser({ id: decoded.id, email: decoded.email, role: decoded.role });
        } catch (err) {
            setError("Login error");
            throw err;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (err) {
            console.log(err)
        } finally {
            setAccessToken(null);
            setUser(null);
        }
    };

    const refresh = async () => {
        try {
            const resp = await authService.refresh();

            if (!resp.success) throw new Error(resp.message || "Refresh failed");

            const token = resp.data?.accessToken;

            if (!token) throw new Error("No access token on refresh");
            setAccessToken(token);

            const decoded = jwtDecode<PayloadToken>(token);

            setUser({
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            });
        } catch (err) {
            setAccessToken(null);
            setUser(null);
            throw err;
        }
    };

    useEffect(() => {
        (async () => {
            try {
                await refresh();
            } catch {
                // no session
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, error, login, logout, refresh }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;