import { lazy } from "react";
import { ProtectedRoute } from "../guards/ProtectedRoutes";


const MainLayout = lazy(() => import("../../layouts/MainLayout"))
const Hall = lazy(() => import("../../pages/Waiter/Hall"))
const MenuPage = lazy(() => import("../../pages/Waiter/MenuPage"))
const KitchenView = lazy(() => import("../../pages/Kitchen/KitchenView"))
const OrderDetail = lazy(() => import("../../pages/Waiter/OrderDetail"))
const CashierView = lazy(() => import("../../pages/Cashier/CashierPage"))


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
                element: <KitchenView />
            },
            {
                path: "mesa/:id",
                element: <OrderDetail />
            },
            {
                path: "cash",
                element: <CashierView />
            }
        ]
    }
]
