import { lazy } from "react";
import { ProtectedRoute } from "../guards/ProtectedRoutes";

const MainLayout = lazy(() => import("../../layouts/MainLayout"))
const Hall = lazy(() => import("../../pages/Waiter/Hall"))
const MenuPage = lazy(() => import("../../pages/Waiter/MenuPage"))
const Kitchen = lazy(() => import("../../pages/Kitchen/Orders"))
const OrderDetail = lazy(() => import("../../pages/Waiter/OrderDetail"))


export const WaiterRoutes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "hall",
                element: (
                    <ProtectedRoute allowedRoles={["ADMIN", "WAITER"]}>
                        <Hall />
                    </ProtectedRoute>
                )
            },
            {
                path: "menu",
                element: <MenuPage />
            },
            {
                path: "kitchen",
                element: <Kitchen />
            },
            {
                path: "mesa/:id",
                element: <OrderDetail />
            }
        ]
    }
]
