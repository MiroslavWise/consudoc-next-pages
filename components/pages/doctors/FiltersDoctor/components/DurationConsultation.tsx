"use client"


import { FC, useId } from "react"
import { isMobile } from "react-device-detect"

import { useFilters } from "@/store/state"

import styles from "./styles/duration-consultation.module.scss"

const MINUTES = [20]

export const DurationConsultation: FC = () => {
    const { filters } = useFilters()
    const id = useId()

    function handleMinutes(value: number) {}

    return (
        <section className={styles.container} data-mobile={isMobile}>
            <h3>Длительность консультации</h3>
            <ul>
                {MINUTES.map((item) => (
                    <li key={`${item}_minutes_${id}`} onClick={() => handleMinutes(item)}>
                        {item} минут
                    </li>
                ))}
            </ul>
        </section>
    )
}
