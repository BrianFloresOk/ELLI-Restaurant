import { Navigate } from "react-router-dom";
import { LoadingSpinnerWithText } from "../../components/ui/LoadingSpinner";
import { useAuth } from "../../hooks/useAuthContext";
import React from 'react'; // Necesitas importar React para usar React.ReactNode

interface ProtectedRouteProps {
    allowedRoles?: string[];
    children: React.ReactNode;
}

export const ProtectedRoute = ({
    allowedRoles = [],
    children
}: ProtectedRouteProps) => {

    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen" >
                <LoadingSpinnerWithText text="Cargando sitio..." />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children
}