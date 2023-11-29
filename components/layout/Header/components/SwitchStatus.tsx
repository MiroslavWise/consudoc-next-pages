"use client"

import { useState } from "react"

import { useProfile } from "@/store/state"

import { cx } from "@/lib/cx"
import { switchStatus } from "@/services/doctors"

import styles from "./styles/switch-status.module.scss"

export const SwitchStatus = () => {
    const profile = useProfile(({ profile }) => profile)
    const isDoctor = useProfile(({ isDoctor }) => isDoctor)
    const setProfile = useProfile(({ setProfile }) => setProfile)
    const asyncUpdateStatus = useProfile(({ asyncUpdateStatus }) => asyncUpdateStatus)
    const [loading, setLoading] = useState(false)

    function onSwitch() {
        if (loading) {
            return
        }
        setLoading(true)
        asyncUpdateStatus()
        switchStatus(profile?.status !== "online" ? "online" : "offline").then((response) => {
            console.log("response switch: ", { response })
            setProfile().finally(() => {
                setLoading(false)
            })
        })
    }

    return isDoctor ? (
        <div className={styles.container}>
            <div
                className={cx(styles.switch, profile?.status === "online" && styles.active)}
                onClick={onSwitch}
            >
                <div className={cx(styles.circle)} />
            </div>
            <a>
                {profile?.status === "online"
                    ? "в сети"
                    : profile?.status === "busy"
                    ? "занят"
                    : "не в сети"}
            </a>
        </div>
    ) : null
}
