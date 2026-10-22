import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router"
import { LoaderPinwheel } from "lucide-react"
import { FieldErrors } from "../FieldErrors"
import { PostDate } from "./PostDate"
import { apiFetch } from "../../api/api"
import page from "../../styles/page.module.css"
import styles from "./PostForm.module.css"

export function PostForm({post = false}) {
    const navigate = useNavigate()
    const {user} = useOutletContext()

    const [title, setTitle] = useState(post ? post.title : "")
    const [content, setContent] = useState(post ? post.content : "")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    function storeValue(setValue, e) {
        setValue(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setIsSubmitting(true)
        const method = post ? "PATCH" : "POST"
        const path = post ? `/posts/${post.id}` : "/posts"
        const body = {title, content}
        async function submitPost() {
            try {
                const data = await apiFetch(path, method, body)
                navigate(`/posts/${data.id}`)
            } catch (error) {
                console.log(error)
                setError(error)
            } finally {
                setIsSubmitting(false)
            }
        }
        submitPost()
    }

    // En modification : l'auteur du post. En création : l'admin connecté.
    const author = post ? post.author : user

    return (
        <div className={styles.page}>
            <h1 className={page.heading}>{post ? "Edit post" : "New post"}</h1>

            <p className={styles.meta}>
                By {author.firstname} {author.lastname}
                {post && <>{" · "}<PostDate post={post} /></>}
            </p>

            {error && !error.errors && <p className={page.error} role="alert">{error.message}</p>}

            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        className={styles.titleInput}
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="off"
                        onChange={(e)=> storeValue(setTitle, e)}
                        value={title}
                    />
                    <FieldErrors error={error} field={"title"}/>
                </div>

                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        className={styles.contentInput}
                        name="content"
                        id="content"
                        onChange={(e)=> storeValue(setContent, e)}
                        value={content}
                    />
                    <FieldErrors error={error} field={"content"}/>
                </div>

                <div className={styles.footer}>
                    <button type="submit" className={styles.submit} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                            <LoaderPinwheel className={styles.spin} size={16} aria-hidden="true" />
                            Saving…
                            </>
                        ) : (
                            post ? "Save changes" : "Create post"
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
