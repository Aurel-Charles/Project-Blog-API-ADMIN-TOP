import styles from "./PostStatus.module.css"

// Pastille d'état : elle montre un état, elle n'est pas cliquable
export function PostStatus({post}) {
    return post.publishedAt
        ? <span className={`${styles.badge} ${styles.published}`}>Published</span>
        : <span className={`${styles.badge} ${styles.draft}`}>Draft</span>
}
