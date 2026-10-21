import { useState } from "react"
import { apiFetch } from "../api/api"
import { FieldErrors } from "../components/FieldErrors"
import page from "../styles/page.module.css"
import form from "../styles/form.module.css"
import { Loader } from "../components/Loader"

export function Login({setToken, authError}) {
    const [email,  setEmail] = useState("")
    const [password,  setPassword] = useState("")
    const [error, setError] = useState(null)
    const [isLogging, setIsLogging] = useState(false)


    function storeValue(setValue, e) {
        setValue(e.target.value) 
    }
    
    function submitLogin(e) {
        e.preventDefault()
        const body = {email, password}
        setError(null)
        async function fetchToken(body) {
            try {
                setIsLogging(true)
                const data = await apiFetch(`/auth/login`, "POST", body)
                localStorage.setItem("token" , data.token)
                setToken(data.token)
            } catch (error) {
                console.error(error)
                setError(error)
            }
            finally{
                setIsLogging(false)
            }
        }

        fetchToken(body)
    }


   

    return (
        <div className={form.page}>
        <h1 className={page.heading}>Admin Blog Portal</h1>
        <h2 className={page.heading}>Log in</h2>
        {authError && (
        <p className={page.error} role="alert">
            {authError.message}
            {authError.isUser && (
            <> Visit <a href={import.meta.env.VITE_BLOG_URL}>the blog</a>.</>
            )}
        </p>
        )}
        {error && !error.errors && <p className={page.error} role="alert">{error.message}</p>}
        <form className={form.form} onSubmit={submitLogin}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" autoComplete="email" onChange={(e)=> storeValue(setEmail, e)} value={email}/>
                <FieldErrors error={error} field={"email"}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" autoComplete="current-password" onChange={(e)=> storeValue(setPassword, e)} value={password}/>
                <FieldErrors error={error} field={"password"}/>
            </div>

            <button type="submit" className={form.submit} disabled={isLogging} >Log in</button>
            {isLogging && <>
                <p>Logging in ...</p>
                <Loader/>
            </> }
        </form>
        </div>
    )
}
