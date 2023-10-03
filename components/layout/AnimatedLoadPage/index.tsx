"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSearchParams } from "next/navigation"

import { cx } from "@/lib/cx"
import { useAnimatedPreload } from "@/store/state/useAnimatedPreload"

import styles from "./style.module.scss"

export function AnimatedLoadPage() {
    const { pathname } = useRouter()
    const pathSearchParams = useSearchParams()
    const { isAnimated, deactivated } = useAnimatedPreload()

    useEffect(deactivated, [pathname, deactivated])

    useEffect(() => {
        pathSearchParams.forEach((item, key) => {
            if (item && key) deactivated()
        })
    }, [pathSearchParams, deactivated])

    return (
        <div className={cx(styles.wrapper, isAnimated && styles.active)}>
            <div className={styles.container} />
        </div>
    )
}
