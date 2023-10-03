"use client"

import { isMobile } from "react-device-detect"

import { useOut } from "@/hooks/useOut"

import styles from "./styles/exit.module.scss"
import Image from "next/image"

export const Exit = () => {
    const { out } = useOut()

    return isMobile ? (
        <Image src="/svg/log-out.svg" alt="log-out" width={30} height={30} onClick={out} />
    ) : (
        <a className={styles.exit} onClick={out}>
            Выход
        </a>
    )
}
