import { Link, NavLink, useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import styles from "./Header.module.css"

// NavLink donne isActive : on ajoute la classe .active sur la page en cours
function navClass({ isActive }) {
    return isActive ? `${styles.link} ${styles.active}` : styles.link
}

export function Header({setToken, user}) {
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem("token")
        setToken(null)
        navigate('/')
    }

    return(
        <header className={styles.header}>
          <div className={styles.inner}>
            <Link to="/" className={styles.brand}><span className={styles.admin} >Admin</span> | My Odin Project blog</Link>
            {user && 
            <nav className={styles.nav} aria-label="Main">
              <NavLink to="/" end className={navClass}>Dashboard</NavLink>
              <NavLink to="/form" end className={navClass}>New Post</NavLink>
              <a target="_blank" className={styles.link} href={import.meta.env.VITE_BLOG_URL}>View Blog</a>
              <p className={styles.greeting}>Hello {user.firstname} {user.lastname[0]}.</p>
              <button type="button" className={styles.logout} onClick={logout}>
                  <LogOut size={16} aria-hidden="true" />
                  Log out
              </button>
            </nav>
            }
          </div>
        </header>
    )
}
