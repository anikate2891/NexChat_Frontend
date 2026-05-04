import { RouterProvider } from "react-router"
import { router } from "./app.route.jsx"
import { useAuth } from "../features/auth/hook/useAuth.js"
import Loader from "../features/auth/components/Loader.jsx"
import { useEffect } from "react"


function App() {
  const auth = useAuth()

  useEffect(() => {
    auth.handleGetMe()
  }, [])
  
  if (auth.loading) return <Loader />

  return (
    <>
      <RouterProvider router={router} />  {/* ← Hamesha render karo */}
    </>
  )
}
export default App