import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import Dashboard from "../features/chat/pages/DashBoard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import PublicRoute from "../features/auth/components/PublicRoute.jsx"

import { Navigate } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>   // ← PublicRoute
    },
    {
        path: "/register",
        element: <PublicRoute><Register /></PublicRoute>  // ← PublicRoute
    },
    {
        path: "/",
        element: <Protected><Dashboard /></Protected>   // ← Protected same
    },
    {
        path: "/dashboard",
        element: <Navigate to="/" replace />
    }
])