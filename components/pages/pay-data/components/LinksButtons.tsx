"use client"

import { useRouter } from "next/router"

import { cx } from "@/lib/cx"
import { usePush } from "@/hooks/usePath"

import styles from "./styles/links.module.scss"

export const LinksButtons = () => {
    const {
        query: { current },
    } = useRouter()
    const { handlePush } = usePush()

    return (
        <ul className={styles.container}>
            {LINKS.map((item) => (
                <li
                    key={`${item.value}-links-pay-data`}
                    onClick={() => {
                        handlePush(`/pay-data?current=${item.value}`)
                    }}
                    className={cx(current?.includes(item.value) && styles.active)}
                >
                    <span>{item.label}</span>
                </li>
            ))}
        </ul>
    )
}

export const LINKS: ILinks[] = [
    {
        label: "Пополнение",
        value: "replenishment",
    },
    {
        label: "Реферальная система",
        value: "referral-system",
    },
]

interface ILinks {
    label: string
    value: TLinksValuePay
}

export type TLinksValuePay =
    | "analytics"
    | "replenishment"
    | "referral-system"
export const LINK_VALUES: TLinksValuePay[] = ["analytics", "referral-system", "replenishment"]
