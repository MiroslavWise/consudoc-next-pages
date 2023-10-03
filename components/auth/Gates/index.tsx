import { useEffect } from "react"

import { useAuth } from "@/store/state"

import styles from "./style.module.scss"

export const Gates = () => {
    const { refresh } = useAuth()

    useEffect(() => {
        if (refresh) {
            refresh()
        }
    }, [refresh])

    return <div className={styles.wrapper}></div>
}
