import { useDispatch, useSelector } from "react-redux";
import { register, login, getMe, logout } from "../service/auth.api.js";
import { setUser, setLoading, setError } from "../auth.slice.js";
import toast from 'react-hot-toast'


export function useAuth() {

    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
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
            dispatch(setError(null))
            const data = await login({ email, password })
            dispatch(setUser(data.user))
            return { success: true }
        } catch (err) {
            const backendError = err.response?.data?.err
            let field = null

            if (backendError === 'User not found') {
                field = 'email'
            } else if (backendError === 'Incorrect password') {
                field = 'password'
            }

            dispatch(setError(err.response?.data?.message || "Login failed"))
            return {
                success: false,
                field,
                message: err.response?.data?.message || 'Login failed',
            }
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
            dispatch(setLoading(false))
        }
    }

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout,
    }

}