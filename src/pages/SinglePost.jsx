import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"
import { ArrowLeft } from "lucide-react";
import { Comments } from "../components/comments/Comments";
import { apiFetch } from "../api/api";
import { Loader } from "../components/Loader";
import page from "../styles/page.module.css"
import article from "../styles/article.module.css"
import { PostDate } from "../components/post/PostDate";
import { PostAction } from "../components/post/PostAction";

export function SinglePost() {
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [error, setError] = useState(null)
    const [actionError, setActionError] = useState(null)

    let params = useParams()
    let postId = params.postId

    useEffect(()=>{
        async function getPost() {
            try {
                const data = await apiFetch(`/posts/${postId}`)
                setPost(data)
            } catch (error) {
                console.error(error);
                setError(error)
            }
        }
        getPost()
        },
        [postId]
    )

    async function togglePublish(post) {
        const body = { published: !post.publishedAt }
        setActionError(null)
        try {
            const updated = await apiFetch(`/posts/${post.id}`, "PATCH", body)
            setPost(updated)
        } catch (error) {
            console.error(error)
            setActionError(error)
        }
    }

    async function deletePost(post) {
        setActionError(null)
        const ok = confirm(`Delete this post: ${post.title}`)
        if (ok) {
            try {
                await apiFetch(`/posts/${post.id}`, "DELETE")
                navigate("/")
            } catch (error) {
                console.error(error)
                setActionError(error)
            }
        }
    }


    if (error) return <p role="alert" className={page.error}>{error.message}</p>
    if (post === null) return <Loader />

    return (
        <>
        <article>
            <Link to="/" className={article.back}>
                <ArrowLeft size={16} aria-hidden="true" />
                Dashboard
            </Link>
            <PostAction post={post} onTogglePublish={togglePublish} onDeletePost={deletePost} showView={false} />
            {actionError && <p role="alert" className={page.error}>{actionError.message}</p> }
            <h1 className={article.title}>{post.title}</h1>
            <div className={article.meta}>
                <span>By {post.author.firstname} {post.author.lastname}</span>
                <PostDate post={post} />
            </div>
            <div className={article.body}>{post.content}</div>
        </article>

        <Comments postId={postId}/>
        </>
    )
}
