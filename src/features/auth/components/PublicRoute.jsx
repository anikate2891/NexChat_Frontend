import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import Loader from './Loader.jsx'

const PublicRoute = ({ children }) => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if (loading) return <Loader />

    if (user) {
        return <Navigate to="/" replace />  // already logged in
    }

    return children
}

export default PublicRoute
