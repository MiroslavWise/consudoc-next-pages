"use client"

import { isMobile } from "react-device-detect"

import type { TPriceOffer } from "@/store/types/useFilters"

import { cx } from "@/lib/cx"
import { BUTTONS_PRICE_OFFER, useFilters } from "@/store/state"

import styles from "./styles/range-values.module.scss"

export const RangeValues = () => {
    const { priceOffer, usePriceOffer } = useFilters()

    function onChange(value: TPriceOffer) {
        usePriceOffer(value)
    }

    return (
        <section className={styles.container} data-mobile={isMobile}>
            <h3>Диапазон стоимости</h3>
            <div className={styles.priceFilter}>
                {BUTTONS_PRICE_OFFER.map((item) => (
                    <div
                        key={`${item.value}_price_item`}
                        onClick={() => {
                            onChange(item.value)
                        }}
                        className={cx(styles.item, priceOffer === item.value && styles.active)}
                    >
                        <p>{item.value?.toUpperCase()}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
