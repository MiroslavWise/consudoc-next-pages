"use client"

import { useRouter } from "next/router"

import { cx } from "@/lib/cx"
import { LINK_TERMS } from "../constants"
import { usePush } from "@/hooks/usePath"

import styles from "./styles/links.module.scss"

export const Links = () => {
    const {
        pathname,
        query: { current },
    } = useRouter()
    const { handleReplace } = usePush()

    return (
        <ul className={styles.container}>
            {LINK_TERMS.map((item) => (
                <li
                    key={`${item.value}-links-pay-data`}
                    onClick={() => {
                        handleReplace(`/terms-and-agreements?current=${item.value}`)
                    }}
                    className={cx(current!?.includes(item.value) && styles.active)}
                >
                    <span>{item.label}</span>
                </li>
            ))}
        </ul>
    )
}
