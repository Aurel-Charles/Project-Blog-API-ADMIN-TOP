import { formatDate } from "../../utils/formatDate"
import { Trash2 } from "lucide-react"
import styles from "./SingleComment.module.css"
import { useState } from "react"
import { ConfirmDialog } from "../ConfirmDialog"

export function SingleComment({comment, deleteComment}) {
    const [isOpen, setIsOpen] = useState(false)

    function handleValidate() {
        deleteComment(comment.id)
        setIsOpen(false)
    }


    return (

    <li className={styles.comment}>
        <div className={styles.header}>
            <span className={styles.name}>{comment.name}</span>
            <time className={styles.date} dateTime={comment.createdAt}>{formatDate(comment.createdAt, "short")}</time>
        </div>
        <p className={styles.content}>{comment.content}</p>
        
            <div className={styles.actions}>
                <button type="button" className={`${styles.quiet} ${styles.danger}`} onClick={()=> setIsOpen(true)}>
                    <Trash2 size={14} aria-hidden="true" />
                    Delete
                </button>
            </div>
    <ConfirmDialog isOpen={isOpen} message={`Delete the comment from ${comment.name}?`} onCancel={()=> setIsOpen(false)} onValidate={handleValidate} />
    </li>


    )
}
