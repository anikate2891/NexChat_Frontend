import { RouterProvider } from "react-router"
import { router } from "./app.route.jsx"
import { useAuth } from "../features/auth/hook/useAuth.js"
import Loader from "../features/auth/components/Loader.jsx"
import { useEffect } from "react"


function App() {

  const auth = useAuth()

 useEffect(() => {
  if (!auth.user) {
    auth.handleGetMe()
  }
}, [])

  if (auth.loading) return <Loader />
  // console.log(auth);
  
return <RouterProvider router={router} />

} 

export default App