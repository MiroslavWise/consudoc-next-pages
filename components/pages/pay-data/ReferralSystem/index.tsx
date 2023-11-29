import { memo, useMemo, useState } from "react"
import { Typography } from "antd/lib"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store/state"

import { getProfile } from "@/services/profile"

import styles from "./style.module.scss"
import { apiReferralPrice } from "@/services/api-referral"
import { usePush } from "@/hooks/usePath"
import { useVisibleModalReferral } from "@/store/state/useVisibleModalReferral"

export const ReferralSystem = memo(function ReferralSystem() {
    const [loading, setLoading] = useState(false)
    const { handleReplace } = usePush()
    const token = useAuth(({ token }) => token)
    const dispatchVisibleReferral = useVisibleModalReferral(({ dispatchVisibleReferral }) => dispatchVisibleReferral)

    const { data, isLoading } = useQuery({
        queryFn: () => getProfile(),
        queryKey: ["profile", token],
        enabled: !!token,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        refetchInterval: false,
    })

    const { data: dataReferral } = useQuery({
        queryFn: () => apiReferralPrice(),
        queryKey: ["referral-price"],
        enabled: !!data?.res?.profile && data?.res?.profile?.is_can_use_ref_code === false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        refetchInterval: false,
    })

    const amountReferral = useMemo(() => {
        if (!!dataReferral?.res?.amount) {
            return Number(dataReferral?.res?.amount)
        }
        return null
    }, [dataReferral])

    const label = useMemo(() => {
        if (data?.res?.profile?.is_can_use_ref_code === false && amountReferral) {
            if (amountReferral > Number(data?.res?.profile?.balance?.current_balance)) {
                return `Пополнить (не хватает ${amountReferral - Number(data?.res?.profile?.balance?.current_balance)})`
            } else if (amountReferral < Number(data?.res?.profile?.balance?.current_balance)) {
                return `Купить (${amountReferral}₸)`
            }
        }
        return null
    }, [data, dataReferral])

    function handle() {
        if (!loading) {
            if (data?.res?.profile?.is_can_use_ref_code === false && amountReferral) {
                if (amountReferral > Number(data?.res?.profile?.balance?.current_balance)) {
                    setLoading(true)
                    handleReplace(
                        `/pay-data?current=replenishment&amount-min=${
                            amountReferral - Number(data?.res?.profile?.balance?.current_balance)
                        }`
                    )
                } else if (amountReferral < Number(data?.res?.profile?.balance?.current_balance)) {
                    dispatchVisibleReferral({
                        visible: true,
                        text: `Жедаете ли вы приобрести подписку на реферальную систему за ${amountReferral}₸`,
                    })
                }
            }
        }
    }

    if (isLoading) return null

    return (
        <div>
            <div className={styles.container}>
                {data?.res?.profile?.is_can_use_ref_code === false ? (
                    <div className={styles.link}>
                        <h3>
                            У вас нет ссылки на реферальную системы. Если вы хотите пригласить друзей и вместе и ними учавствовать в
                            нашей программе, вы можете купить доступ к ней
                        </h3>
                        {label ? (
                            <button onClick={handle} type="button">
                                <span>{label}</span>
                            </button>
                        ) : null}
                    </div>
                ) : data?.res?.profile?.is_can_use_ref_code === true ? (
                    <div className={styles.link}>
                        <h3>Ссылка для приглашения друга:</h3>
                        <Typography.Paragraph
                            copyable={{
                                text: `${data?.res?.profile?.user?.get_full_name} ${
                                    data?.res?.profile?.gender === "male"
                                        ? "пригласил Вас в сервис Spenat"
                                        : "пригласила Вас в сервис Spenat"
                                } https://${process.env.NEXT_PUBLIC_FRONTEND}/?referral_code=${data?.res?.profile?.referral_code}`,
                            }}
                            style={{ padding: 0, margin: 0, color: "var(--success-600)" }}
                        >
                            {data?.res?.profile?.referral_code}
                        </Typography.Paragraph>
                    </div>
                ) : null}
            </div>
        </div>
    )
})
