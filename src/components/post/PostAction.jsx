import { Eye, Trash } from "lucide-react";
import styles from "./PostAction.module.css"
import { Link } from "react-router";

export function PostAction({post, onTogglePublish, onDeletePost, showView = true}) {
    return (
        <div className={styles.actions}>
            {showView && <Link aria-label={`View ${post.title}`} className={styles.edit} to={`/posts/${post.id}`}><Eye size={16} aria-hidden={true} /></Link>}
            <Link className={styles.edit} to={`/form/${post.id}`}>Edit</Link>

            

            <button type="button" onClick={() => onTogglePublish(post)}>
                {post.publishedAt ? "Unpublish" : "Publish"}
            </button>
            <button className={styles.deleteBtn} aria-label={`Delete ${post.title}`} type="button" onClick={() => onDeletePost(post)}>
                <Trash size={16} aria-hidden="true" />
            </button>
        </div>
    )
}