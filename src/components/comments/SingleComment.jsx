import { formatDate } from "../../utils/formatDate"
import { LoaderPinwheel, Trash2 } from "lucide-react"
import styles from "./SingleComment.module.css"
import { useState } from "react"
import { ConfirmDialog } from "../ConfirmDialog"

export function SingleComment({comment, deleteComment}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleValidate() {
        setIsDeleting(true)
        setIsOpen(false)
        try {
            await deleteComment(comment.id)
        } finally {
            setIsDeleting(false)
        }
    }


    return (

    <li className={styles.comment}>
        <div className={styles.header}>
            <span className={styles.name}>{comment.name}</span>
            <time className={styles.date} dateTime={comment.createdAt}>{formatDate(comment.createdAt, "short")}</time>
        </div>
        <p className={styles.content}>{comment.content}</p>
        
            <div className={styles.actions}>
                <button type="button" className={`${styles.quiet} ${styles.danger}`} aria-label={`Delete the comment from ${comment.name}`} onClick={()=> setIsOpen(true)} disabled={isDeleting} >
                {isDeleting ? 
                <>
                <LoaderPinwheel className={styles.spin} size={16} aria-hidden="true" />
                Deleting…
                </>
                 :
                <Trash2 size={16} aria-hidden="true" />
                }
                </button>
            </div>
    <ConfirmDialog isOpen={isOpen} message={`Delete the comment from ${comment.name}?`} onCancel={()=> setIsOpen(false)} onValidate={handleValidate} />
    </li>


    )
}
