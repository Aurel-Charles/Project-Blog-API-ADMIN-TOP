import { useState } from "react"
import { apiFetch } from "../api/api"
import { FieldErrors } from "../components/FieldErrors"
import form from "../styles/form.module.css"
import { LoaderPinwheel } from "lucide-react"
import styles from "./Login.module.css"

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
        <main className={styles.screen}>
            <div className={styles.card}>
                <p className={styles.brand}>
                    <span className={styles.admin}>Admin</span> | My Odin Project blog
                </p>
                <h1 className={styles.heading}>Log in</h1>
                <p className={styles.lede}>This portal is reserved for the blog administrator.</p>

                {authError && (
                    <p className={styles.alert} role="alert">
                        {authError.message}
                        {authError.isUser && (
                            <> Visit <a href={import.meta.env.VITE_BLOG_URL}>the blog</a>.</>
                        )}
                    </p>
                )}
                {error && !error.errors && <p className={styles.alert} role="alert">{error.message}</p>}

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

                    <button type="submit" className={styles.submit} disabled={isLogging}>
                        {isLogging ? (
                            <>
                            <LoaderPinwheel className={styles.spin} size={16} aria-hidden="true" />
                            Logging in…
                            </>
                        ) : "Log in"}
                    </button>
                </form>
            </div>

            <a className={styles.blogLink} href={import.meta.env.VITE_BLOG_URL}>← Back to the blog</a>
        </main>
    )
}
