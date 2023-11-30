"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import styles from "./styles/links.module.scss"

export const LinksButtons = () => {
    const current = useSearchParams().get("current")

    return (
        <ul className={styles.container}>
            {LINKS.map((item) => (
                <Link
                    href={`/pay-data?current=${item.value}`}
                    key={`${item.value}-links-pay-data`}
                    data-active={current?.includes(item.value)}
                >
                    <span>{item.label}</span>
                </Link>
            ))}
        </ul>
    )
}

export const LINKS: ILinks[] = [
    {
        label: "Транзакции",
        value: "order",
    },
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

export type TLinksValuePay = "analytics" | "replenishment" | "referral-system" | "order"
export const LINK_VALUES: TLinksValuePay[] = ["analytics", "referral-system", "replenishment"]
