import React from "react";
import { AuthProvider } from "./contexts/AuthContext";

export const AppProviders = ({ children }: React.PropsWithChildren) => (
    <AuthProvider>
        {children}
    </AuthProvider>
);
