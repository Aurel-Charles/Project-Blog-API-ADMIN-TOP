import { Link } from "react-router";
import { formatDate } from "../utils/formatDate";
import styles from "../pages/Dashboard.module.css"
import page from "../styles/page.module.css"


export function DashboardPost({post, onTogglePublish, onDeletePost, error}) {
    // const for class badges
    const draftBadge = `${styles.badge} ${styles.draft}`
    const publishedBadge = `${styles.badge} ${styles.published}`
    return(
        <li className={styles.item}>
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
            {error && <p className={page.error} role="alert">{error}</p> }
            </div>


            <div className={styles.actions}>
            <button type="button" onClick={() => onTogglePublish(post)}>
                {post.publishedAt ? "Unpublish" : "Publish"}
            </button>
            <button className={styles.deleteBtn} type="button" onClick={() => onDeletePost(post)}>
                Delete
            </button>
            </div>
        </li>
    )
} 