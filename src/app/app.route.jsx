import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import Dashboard from "../features/chat/pages/DashBoard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import { Navigate } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected>
                <Dashboard />
            </Protected>
    },
    {
        path: "/dashboard",
        element: <Navigate to="/" replace />
    }
])