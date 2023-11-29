"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store/state"
import { usePush } from "@/hooks/usePath"
import { getProfile } from "@/services/profile"

import styles from "./styles/pay.module.scss"

export const PayComponent = () => {
    const { handlePush } = usePush()
    const token = useAuth(({ token }) => token)

    const { data } = useQuery({
        queryFn: () => getProfile(),
        queryKey: ["profile", token],
        enabled: !!token,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    function handlePay() {
        handlePush("/pay-data?current=replenishment")
    }

    return (
        <div className={styles.container} onClick={handlePay}>
            <Image src="/svg/pay.svg" alt="pay" height={isMobile ? 18 : 22} width={isMobile ? 18 : 22} />
            {data?.res?.profile?.balance?.current_balance ? (
                <p>
                    <b>Баланс</b> {Number(data?.res?.profile?.balance?.current_balance)?.toFixed(2)}₸
                </p>
            ) : null}
        </div>
    )
}
