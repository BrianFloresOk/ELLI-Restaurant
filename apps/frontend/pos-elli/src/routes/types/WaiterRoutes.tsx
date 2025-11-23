import { lazy } from "react";
import { ProtectedRoute } from "../guards/ProtectedRoutes";


const MainLayout = lazy(() => import("../../layouts/MainLayout"))
const Hall = lazy(() => import("../../pages/Waiter/Hall"))
const MenuPage = lazy(() => import("../../pages/Waiter/MenuPage"))


export const WaiterRoutes = [
    {
        path: "/system",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute allowedRoles={["ADMIN", "WAITER"]}>
                        <Hall />
                    </ProtectedRoute>
                ),
            },
            {
                path: "menu",
                element: <MenuPage />
            }
        ]
    }
]
