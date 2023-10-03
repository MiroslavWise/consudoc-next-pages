"use client"

import Image from "next/image"

import { usePush } from "@/hooks/usePath"
import { useProfile } from "@/store/state"

import styles from "./styles/links.module.scss"

export const Links = () => {
    const { user } = useProfile()
    const { handlePush } = usePush()

    function handleProfile() {
        handlePush("/profile")
    }

    return (
        <div className={styles.container}>
            <div className={styles.profile} onClick={handleProfile}>
                <Image src="/svg/profile.svg" alt="profile" height={22} width={20} />
                {user?.get_full_name ? <a>{user?.get_full_name}</a> : null}
            </div>
        </div>
    )
}
