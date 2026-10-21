import { LoaderPinwheel } from "lucide-react"
import styles from "./Loader.module.css"

// role="status" : les lecteurs d'écran annoncent "Loading…" même si on ne voit que l'icône
export function Loader({ size = 28 }) {
    return (
        <div className={styles.loader} role="status">
            <LoaderPinwheel className={styles.spin} size={size} aria-hidden="true" />
            <span className={styles.visuallyHidden}>Loading…</span>
        </div>
    )
}
