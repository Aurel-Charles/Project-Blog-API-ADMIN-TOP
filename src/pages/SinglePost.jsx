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
import { PostStatus } from "../components/post/PostStatus";
import styles from "./SinglePost.module.css"
import DOMPurify from "dompurify";

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
                const data = await apiFetch(`/posts/${postId}?status=all`)
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
        try {
            await apiFetch(`/posts/${post.id}`, "DELETE")
            navigate("/")
        } catch (error) {
            console.error(error)
            setActionError(error)
        }
    }

    function purifyInnerHtml(content) {
        const sanitizedHtml =  DOMPurify.sanitize(content)
        return { __html: sanitizedHtml }
    }

    if (error) return <p role="alert" className={page.error}>{error.message}</p>
    if (post === null) return <Loader />

    return (
        <>
        <article>
            <div className={styles.toolbar}>
                <Link to="/" className={styles.back}>
                    <ArrowLeft size={16} aria-hidden="true" />
                    Dashboard
                </Link>
                <PostAction post={post} onTogglePublish={togglePublish} onDeletePost={deletePost} showView={false} />
            </div>
            {actionError && <p role="alert" className={`${page.error} ${styles.actionError}`}>{actionError.message}</p> }

            <PostStatus post={post} />
            <h1 className={`${article.title} ${styles.title}`}>{post.title}</h1>
            <div className={article.meta}>
                <span>By {post.author.firstname} {post.author.lastname}</span>
                <span><PostDate post={post} /></span>
            </div>
            <div className={article.body} dangerouslySetInnerHTML={purifyInnerHtml(post.content)} ></div>
        </article>

        <Comments postId={postId}/>
        </>
    )
}
