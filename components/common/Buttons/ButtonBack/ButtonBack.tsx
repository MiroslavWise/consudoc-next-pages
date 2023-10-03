"use client"

import { useParams, useSearchParams } from "next/navigation"

import { usePush } from "@/hooks/usePath"

import styles from "./button-back.module.scss"
import Image from "next/image"

export const ButtonBack = ({ path }: { path: string }) => {
    const searchParams = useSearchParams()
    const id__ = searchParams.get("uuid")
    const id_ = searchParams.get("id")
    const params = useParams()
    const { id } = params ?? {}
    const { handleReplace, handlePush } = usePush()

    function handleBack() {
        id ? handlePush(path) : handleReplace(path)
    }

    return id || id_ || id__ ? (
        <div className={styles.container} onClick={handleBack}>
            <Image src="/svg/chevron-left.svg" alt="chevron-left" width={24} height={24} />
        </div>
    ) : null
}
