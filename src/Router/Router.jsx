import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Register/Resgister";
import PrivateRoute from "./PrivateRoute";
import BalanceInquiry from "../Components/BalenceInquery/BalenceInquery";
import TransactionList from "../Components/Trangection/Trangection";
import Sendmoney from "../Pages/Sendmoney/Sendmoney";
import Cashout from "../Pages/Cashout/Cashout";
import Cashin from "../Pages/Cashin/Cashin";
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
            {
                path: "/balance",
                element: <BalanceInquiry />,
            },
            {
                path: "/transactions",
                element: <TransactionList />,
            },
            {
                path: "/sendmoney",
                element: <Sendmoney />,
            },
            {
                path: "/cashout",
                element: <Cashout />,
            },
            {
                path: "/cashin",
                element: <Cashin />,
            },
        ]
    },
]);