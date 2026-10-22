import styles from "./PostStatus.module.css"


export function PostStatus({post}) {
    return post.publishedAt
        ? <span className={`${styles.badge} ${styles.published}`}>Published</span>
        : <span className={`${styles.badge} ${styles.draft}`}>Draft</span>
}
