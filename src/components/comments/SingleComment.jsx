import { formatDate } from "../../utils/formatDate"
import { Trash2 } from "lucide-react"
import styles from "./SingleComment.module.css"

export function SingleComment({comment, deleteComment}) {



    return (
    <li className={styles.comment}>
        <div className={styles.header}>
            <span className={styles.name}>{comment.name}</span>
            <time className={styles.date} dateTime={comment.createdAt}>{formatDate(comment.createdAt, "short")}</time>
        </div>
        <p className={styles.content}>{comment.content}</p>
        
            <div className={styles.actions}>
                <button type="button" className={`${styles.quiet} ${styles.danger}`} onClick={()=> deleteComment(comment.id)}>
                    <Trash2 size={14} aria-hidden="true" />
                    Delete
                </button>
            </div>
    </li>
    )
}
