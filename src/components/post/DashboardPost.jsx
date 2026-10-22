import { Link } from "react-router";
import styles from "../../pages/Dashboard.module.css"
import page from "../../styles/page.module.css"
import { PostDate } from "./PostDate";
import { PostAction } from "./PostAction";


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
                    <PostDate post={post} format="short"/>
                    {" · "}By {post.author.firstname} {post.author.lastname}
                </p>
            {error && <p className={page.error} role="alert">{error}</p> }
            </div>


            <PostAction post={post} onTogglePublish={onTogglePublish} onDeletePost={onDeletePost} />
        </li>
    )
} 