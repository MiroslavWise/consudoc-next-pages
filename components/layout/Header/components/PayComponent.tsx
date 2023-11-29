"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"

import { useProfile } from "@/store/state"
import { usePush } from "@/hooks/usePath"

import styles from "./styles/pay.module.scss"

export const PayComponent = () => {
    const { handlePush } = usePush()
    const profile = useProfile(({ profile }) => profile)

    function handlePay() {
        handlePush("/pay-data?current=replenishment")
    }

    return (
        <div className={styles.container} onClick={handlePay}>
            <Image
                src="/svg/pay.svg"
                alt="pay"
                height={isMobile ? 18 : 22}
                width={isMobile ? 18 : 22}
            />
            {profile?.balance?.current_balance ? (
                <p>
                    <b>Баланс</b> {Number(profile?.balance?.current_balance)?.toFixed(2)}₸
                </p>
            ) : null}
        </div>
    )
}
