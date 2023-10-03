import type { TDividerHorizontal } from "./types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const DividerHorizontal: TDividerHorizontal = ({ classNames }) => {
    return <div className={cx(styles.container, classNames)} />
}
