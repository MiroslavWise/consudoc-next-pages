"use client"

import Image from "next/image"

import { usePush } from "@/hooks/usePath"
import { useAuth, useProfile } from "@/store/state"

import styles from "./styles/logo.module.scss"
import Link from "next/link"

export const Logo = () => {
    const state = useAuth(({ state }) => state)
    const { handlePush, handleReplace } = usePush()
    const isDoctor = useProfile(({ isDoctor }) => isDoctor)

    function handleMain() {
        if (state === "SignIn") {
            handleReplace("/")
            return
        }

        if (isDoctor) {
            handlePush("/archive")
        } else {
            handlePush("/doctors")
        }
    }

    const link = state === "SignIn" ? "/" : isDoctor ? "/archive" : "/doctors"

    return (
        <Link className={styles.container} href={link}>
            <Image src="/svg/main-logo.svg" alt="main-logo" width={58} height={50} className={styles.logo} unoptimized />
            <div className={styles.names}>
                <Image src="/svg/consudoc.svg" alt="consudoc" width={160} height={22} unoptimized />
                <p>консультация у доктора</p>
            </div>
        </Link>
    )
}
