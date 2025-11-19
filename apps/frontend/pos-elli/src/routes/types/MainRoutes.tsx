import { lazy } from "react";

const imports = {
    Login: lazy(() => import("../../pages/Login")),
}

const Login = imports.Login;

export const MainRoutes = [
    {
        path: "/",
        element: <Login />
    }
]
