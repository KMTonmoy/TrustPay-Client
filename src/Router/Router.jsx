import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Register/Resgister";
import PrivateRoute from "./PrivateRoute";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <PrivateRoute> <Home /></PrivateRoute>,
            },
            {
                path: "/signup",
                element: <Registration />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ]
    },
]);