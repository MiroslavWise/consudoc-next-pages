import { memo, type FC } from "react"

import { cx } from "@/lib/cx"

import styles from "../styles/time.module.scss"

interface IItemTime {
    time: string
}

export const ItemTime: FC<IItemTime> = memo(function $ItemTime({ time }) {
    return (
        <div className={cx(styles.wrapper, "sticky")}>
            <div className={styles.container}>
                <span>{time}</span>
            </div>
        </div>
    )
})
