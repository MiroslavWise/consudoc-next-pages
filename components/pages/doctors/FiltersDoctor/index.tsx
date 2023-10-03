import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"

import { RangeValues } from "./components/RangeValues"
import { StatusDoctors } from "./components/StatusDoctors"
import { DurationConsultation } from "./components/DurationConsultation"

import styles from "./style.module.scss"

export const FiltersDoctor = () => {
    return (
        <ul className={styles.wrapper}>
            <StatusDoctors />
            <DurationConsultation />
            <RangeValues />
        </ul>
    )
}

export const HeaderMobileFilter = () => {
    const params = useParams()
    const { id } = params ?? {}
    const [isOpen, setIsOpen] = useState(false)

    function handleOpen() {
        setIsOpen((prev) => !prev)
    }

    return id ? null : (
        <div className={styles.headerMobile}>
            <div className={styles.div} />
            <div className={styles.filterSpan} onClick={handleOpen} data-open={isOpen}>
                <span>Фильтры</span>
                <Image
                    src={
                        isOpen ? "/svg/chevron-up-double.svg" : "/svg/chevron-down-double.svg"
                    }
                    alt="chevron-selector-vertical"
                    width={30}
                    height={30}
                />
            </div>
            <div className={styles.filtersBlock} data-open-filter-block={isOpen}>
                <StatusDoctors />
                <DurationConsultation />
                <RangeValues />
            </div>
        </div>
    )
}
