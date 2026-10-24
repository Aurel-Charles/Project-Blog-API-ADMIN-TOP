import { useEffect, useState } from "react"
import { Link } from "react-router";
import { apiFetch } from "../api/api";
import { Loader } from "../components/Loader";
import page from "../styles/page.module.css"
import styles from "./Dashboard.module.css"
import { DashboardPost } from "../components/post/DashboardPost";

export function Dashboard() {
    const [posts, setPosts] = useState(null)
    const [error, setError] = useState(null)
    const [actionError, setActionError] = useState(null)


    useEffect(()=> {
            async function getPosts() {
                try {
                    const data = await apiFetch("/posts?status=all")
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
        try {
            await apiFetch(`/posts/${post.id}`, "DELETE")
            setPosts((prev)=> prev.filter(p => p.id !== post.id))
        } catch (error) {
            console.error(error)
            setActionError({message : error.message, postId : post.id})
        }
    }

    let postsSection 

    if (error) { postsSection =  <p role="alert" className={page.error}>{error.message}</p>}
    else if (posts === null) postsSection = <Loader />
    else if (posts.length === 0) postsSection = <p className={page.status}>No posts yet.</p>
    else {
        postsSection = (
            <ol className={styles.list}>
                {posts.map((post)=> (
                    <DashboardPost
                        key={post.id}
                        post={post}
                        onTogglePublish={togglePublish}
                        onDeletePost={deletePost}
                        error={actionError && post.id === actionError.postId ? actionError.message : null}
                    />
                ) )}
            </ol>
        )
    }


    return (
        <>
        <div className={styles.top}>
            <h1 className={page.heading}>Posts</h1>
            <Link className={styles.newPost} to="/form">New Post</Link>
        </div>
        {postsSection}
        </>
    )
}
