import { useEffect, useState } from "react"
import { Link } from "react-router";
import { apiFetch } from "../api/api";
import { formatDate } from "../utils/formatDate";
import { Loader } from "../components/Loader";
import page from "../styles/page.module.css"
import styles from "./Dashboard.module.css"

export function Dashboard() {
    const [posts, setPosts] = useState(null)
    const [error, setError] = useState(null)
    const [actionError, setActionError] = useState(null)

    // const for class badges
    const draftBadge = `${styles.badge} ${styles.draft}`
    const publishedBadge = `${styles.badge} ${styles.published}`

    useEffect(()=> {
            async function getPosts() {
                try {
                    const data = await apiFetch("/posts")
                    setPosts(data)
                } catch (error) {
                    console.error(error)
                    setError(error)
                }
            }
            getPosts()
            },
        []
    )

    async function togglePublish(post) {
        const body = { published: !post.publishedAt }
        setActionError(null)
        try {
            const updated = await apiFetch(`/posts/${post.id}`, "PATCH", body)
            setPosts((prev) => prev.map((p) => p.id === updated.id ?  updated : p ))
        } catch (error) {
            console.error(error)
            setActionError({message : error.message, postId : post.id})
        }
    }

    async function deletePost(post) {
        setActionError(null)
        const ok = confirm(`Delete this post: ${post.title}`)
        if (ok) {
            try {
                await apiFetch(`/posts/${post.id}`, "DELETE")
                setPosts((prev)=> prev.filter(p => p.id !== post.id))
            } catch (error) {
                console.error(error)
                setActionError({message : error.message, postId : post.id})
            }
        }
    }

    if (error) return <p className={page.error}>{error.message}</p>
    if (posts === null) return <Loader />

    return (
        <>
        <div className={styles.top}>
            <h1 className={page.heading}>Posts</h1>
            <Link className={styles.newPost} to="/form">New Post</Link>
        </div>
        {posts.length === 0  ?
            <p className={page.status}>No posts yet.</p>
        :
            <ol className={styles.list}>
                {posts.map((post)=> (
                    <li key={post.id} className={styles.item}>
                        {post.publishedAt
                            ? <span className={publishedBadge}>Published</span>
                            : <span className={draftBadge}>Draft</span>}

                        <div className={styles.body}>
                            <h2 className={styles.title}>
                                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                            </h2>

                            <p className={styles.meta}>
                                {post.publishedAt ? (
                                    <>
                                    Published{" "}
                                    <time dateTime={post.publishedAt}>
                                        {formatDate(post.publishedAt, "short")}
                                    </time>
                                    </>
                                ) : (
                                    <>
                                    Created{" "}
                                    <time dateTime={post.createdAt}>
                                        {formatDate(post.createdAt, "short")}
                                    </time>
                                    {post.updatedAt !== post.createdAt && (
                                        <>
                                        {" · "}Updated{" "}
                                        <time dateTime={post.updatedAt}>
                                            {formatDate(post.updatedAt, "short")}
                                        </time>
                                        </>
                                    )}
                                    </>
                                )}
                                {" · "}By {post.author.firstname} {post.author.lastname}
                            </p>
                        {actionError && post.id === actionError.postId && <p className={page.error} role="alert">{actionError.message}</p> }
                        </div>


                        <div className={styles.actions}>
                        <button type="button" onClick={() => togglePublish(post)}>
                            {post.publishedAt ? "Unpublish" : "Publish"}
                        </button>
                        <button className={styles.deleteBtn} type="button" onClick={() => deletePost(post)}>
                            Delete
                        </button>
                        </div>
                    </li>
                ) )}
            </ol>
        }
        </>
    )
}
