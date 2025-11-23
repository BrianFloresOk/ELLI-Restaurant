import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { MainRoutes } from "./types/MainRoutes"
import { WaiterRoutes } from "./types/WaiterRoutes"



const RootLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export const AppBrowserRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                ...MainRoutes,
                ...WaiterRoutes
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    );
}