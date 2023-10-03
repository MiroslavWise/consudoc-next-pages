"use client"

import Image from "next/image"
import { type Dispatch, type SetStateAction } from "react"

import type { TTypeMainScreen } from "@/components/auth/Main/components/types/types"

import { useAuth, useProfile } from "@/store/state"
import { usePush } from "@/hooks/usePath"

import styles from "./styles/logo.module.scss"

export const Logo = ({
    setState,
}: {
    setState?: Dispatch<SetStateAction<TTypeMainScreen>>
}) => {
    const { state } = useAuth()
    const { handlePush } = usePush()
    const { isDoctor } = useProfile()

    function handleMain() {
        if (state === "SignIn") {
            if (setState) {
                setState("main")
            }
            return
        }

        if (isDoctor) {
            handlePush("/archive")
        } else {
            handlePush("/doctors")
        }
    }

    return (
        <div className={styles.container} onClick={handleMain}>
            <Image
                src="/svg/main-logo.svg"
                alt="main-logo"
                width={58}
                height={50}
                className={styles.logo}
                unoptimized
            />
            <div className={styles.names}>
                <Image
                    src="/svg/consudoc.svg"
                    alt="consudoc"
                    width={160}
                    height={22}
                    unoptimized
                />
                <p>консультация у доктора</p>
            </div>
        </div>
    )
}
