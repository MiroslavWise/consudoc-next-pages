import type { TDividerVertical } from "./types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const DividerVertical: TDividerVertical = ({ classNames }) => {
    return <div className={cx(styles.container, classNames)} data-divider />
}
