"use client"

import { cx } from "@/lib/cx"
import { styleIsMobile } from "@/lib/styleIsMobile"

import styles from "./styles/item-loading.module.scss"

export const ItemLoading = () => {
    return <li className={ cx(styles.container, styles[styleIsMobile])} />
}
