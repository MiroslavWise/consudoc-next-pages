"use client"

import { isMobile } from "react-device-detect"

import type { TStatus } from "@/store/types/useFilters"

import { cx } from "@/lib/cx"
import { BUTTONS_STATUS_ONLINE, useFilters } from "@/store/state"

import styles from "./styles/range-values.module.scss"

export const StatusDoctors = () => {
    const { filters, setStatus } = useFilters()
    const { doctor__status } = filters ?? {}

    function onChange(value: TStatus) {
        setStatus(value)
    }

    return (
        <section className={styles.container} data-mobile={isMobile}>
            <h3>Статус</h3>
            <div className={styles.priceFilter}>
                {BUTTONS_STATUS_ONLINE.map((item) => (
                    <div
                        key={`${item.value}_status`}
                        onClick={() => {
                            onChange(item.value)
                        }}
                        className={cx(
                            styles.item,
                            doctor__status === item.value && styles.active
                        )}
                    >
                        <p>{item.label?.toUpperCase()}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
