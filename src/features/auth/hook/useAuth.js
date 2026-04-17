import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";
import toast from 'react-hot-toast'


export function useAuth() {


    const dispatch = useDispatch()

    async function handleRegister({ email, username, password }) {
    try {
        dispatch(setLoading(true))
        await register({ email, username, password })
        toast.success("Registration successful! Please check your email ✅")
    } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed")
        dispatch(setError(error.response?.data?.message || "Registration failed"))
    } finally {
        dispatch(setLoading(false))
    }
}

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true))
            const data = await login({ email, password })
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Login failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        } catch (err) {
            if (err.response?.status === 401) {
                dispatch(setUser(null)) // ✅ bas user null karo, koi error nahi
            } else {
                dispatch(setError(err.response?.data?.message || "Failed to fetch user data"))
            }
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogout() {
        try {
            await logout()
        } catch (err) {
            // Keep UI logged out even if request fails (e.g. expired cookie).
            console.error(err)
        } finally {
            dispatch(setUser(null))
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout,
    }

}