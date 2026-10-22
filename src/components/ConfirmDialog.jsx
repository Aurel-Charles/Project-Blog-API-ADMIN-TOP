import { useEffect, useRef } from "react"
import styles from "./ConfirmDialog.module.css"

export function ConfirmDialog({ isOpen, message, onValidate, onCancel }) {
    const dialogRef = useRef(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (isOpen) {
            dialog.showModal()
        } else {
            dialog.close()
        }
    }, [isOpen])

    return (
        <dialog ref={dialogRef} className={styles.dialog} onClose={onCancel}>
            <p className={styles.message}>{message}</p>
            <div className={styles.actions}>
                <button type="button" className={styles.cancel} onClick={onCancel}>
                    Cancel
                </button>
                <button type="button" className={styles.confirm} onClick={onValidate}>
                    Delete
                </button>
            </div>
        </dialog>
    )
}