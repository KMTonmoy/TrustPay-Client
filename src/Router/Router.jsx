import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Register/Resgister";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/signup",
                element: <Registration />,
            },
        ]
    },
]);