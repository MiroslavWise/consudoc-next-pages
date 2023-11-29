"use client"

import Image from "next/image"

import { useProfile } from "@/store/state"
import { usePush } from "@/hooks/usePath"

import styles from "./styles/search-doctor.module.scss"

export const SearchDoctor = () => {
    const isDoctor = useProfile(({ isDoctor }) => isDoctor)
    const { handlePush } = usePush()

    function handleDoctors() {
        if (isDoctor === false) {
            handlePush("/doctors")
        }
    }

    return isDoctor !== undefined && isDoctor === false ? (
        <div className={styles.container} onClick={handleDoctors}>
            <Image src="/svg/search.svg" alt="search" width={18.3} height={18.3} />
            <a>Поиск доктора</a>
        </div>
    ) : null
}
