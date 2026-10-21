import { useEffect, useState } from "react"
import { apiFetch } from "./api/api"
import { Login } from "./pages/Login"
import { Loader } from "./components/Loader";
import { Outlet } from "react-router";
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import styles from './App.module.css'
import page from './styles/page.module.css'


function App() {
  const [token, setToken] = useState(()=> localStorage.getItem("token"))
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState(null)


  useEffect(()=> {
    async function getUser() {
      if (!token) {
        return setUser(null)
      }
      try {
        setAuthError(null)
        const data = await apiFetch("/auth/me")
        if (data.role === "ADMIN") {
          return setUser(data)
        }
        setAuthError({message : "This is an administrator only page", isUser: true})
        
        localStorage.removeItem("token")
        setToken(null)
      } catch (error) {
        console.error(error);
        if (error.status === 401) {
          localStorage.removeItem("token")
          setToken(null)
        }
        setAuthError({message: error.message, isUser: false})
      }
    }
    getUser()

  },[token]
)

  if (!token) {
    return(
      <Login setToken={setToken} authError={authError}  />
    )
  }
  
  if (!user) {
    if (authError) {
      return <p className={page.error} role="alert">{authError.message}</p>
    }
    return <Loader />
  }

  return (
   <>
      <Header  setToken= {setToken} user={user} />

      <main className={styles.main}>
        <Outlet context={{token, setToken, user}} />
      </main>

      <Footer/>
   </>
  )
}

export default App
