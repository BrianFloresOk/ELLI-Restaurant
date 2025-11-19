import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { MainRoutes } from "./types/MainRoutes"



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
            children: MainRoutes
        }
    ])

    return (
        <RouterProvider router={router} />
    );
}