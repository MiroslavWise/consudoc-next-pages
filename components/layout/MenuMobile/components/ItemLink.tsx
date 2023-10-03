"use client"

import Image from "next/image"
import { memo, useMemo } from "react"
import { useRouter } from "next/router"

import { type TItemLink } from "./types/types"

import styles from "./styles/item-link.module.scss"
import { cx } from "@/lib/cx"
import { usePush } from "@/hooks/usePath"

export const ItemLink: TItemLink = memo(({ label, img, path }) => {
    const router = useRouter()
    const { handlePush } = usePush()

    const active: boolean = useMemo(() => {
        return router.pathname.includes(path)
    }, [router, path])

    function handleTouch() {
        handlePush(path)
    }

    return (
        <div className={cx(styles.container, active && styles.active)} onClick={handleTouch}>
            <Image
                src={
                    active
                        ? img.replace("__item__", "fill")
                        : img.replace("__item__", "regular")
                }
                alt={img}
                width={28}
                height={28}
            />
            <p>{label}</p>
        </div>
    )
})
