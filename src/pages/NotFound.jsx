import { Link } from "react-router";
import page from "../styles/page.module.css"

export function NotFound() {
    return(
        <>
        <h1 className={page.heading}>Page not found</h1>
        <p className={page.lede}>This address doesn't match any page on the blog.</p>
        <Link to="/">Back to Dashboard</Link>
        </>
    )
}
