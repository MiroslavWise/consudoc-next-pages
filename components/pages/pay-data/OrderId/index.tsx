import { memo, useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { useAuth } from "@/store/state"
import { apiOrder } from "@/services/api-order"
import { useWeb } from "@/context/useWebSocket"

import styles from "./style.module.scss"

export const OrderId = memo(function OrderId() {
    const orderId = useSearchParams().get("order-id")
    const token = useAuth(({ token }) => token)
    const { wsChannel } = useWeb()

    const { data, isLoading, refetch } = useQuery({
        queryFn: () => apiOrder(orderId!),
        queryKey: ["order", orderId],
        enabled: !!orderId && !!token,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (wsChannel) {
            wsChannel.addEventListener("message", eventMessage)
        }
        return () => wsChannel?.removeEventListener("message", eventMessage)
    }, [wsChannel])

    function eventMessage(event: any) {
        const data = JSON.parse(event.data).data
        if (data?.type === "billing_deposit_up") {
            refetch()
        }
        if (data?.type === "billing_declined") {
            refetch()
        }
    }

    const status = useMemo(() => {
        if (!data?.res) {
            return null
        }

        const status = data?.res?.status

        return status
    }, [data?.res?.status])

    // useEffect(() => {
    //     if (status) {
    //         if (["charged", "declined", "fraud", "rejected", "error", "validation"].includes(status)) {
    //             const timeOut = setTimeout(() => {
    //                 handlePush(`/doctors`, undefined)
    //             }, 7 * 1000)

    //             return () => clearTimeout(timeOut)
    //         }
    //     }
    // }, [status])

    if (isLoading) return null

    return (
        <div className={styles.container}>
            <section data-status={status}>
                <p>
                    {status === "charged"
                        ? "Платёж поступил, и вы можете воспользоваться услугами консультации!"
                        : status === "new"
                        ? "Идёт транзакция поступления средств на ваш счёт. Это может занять несколько минут, и вы получите уведомление о поступлении средств!"
                        : status === "validation"
                        ? "Транзакция не прошла валидацию. Повторите операцию через несколько минут"
                        : status === "error"
                        ? "Произошла какая-то ошибка платежа. Наш сервис разбирается в ней. Попробуйте, пожалуйста, чуть позже"
                        : status === "declined"
                        ? "Транзакция была отклонена"
                        : null}
                </p>
            </section>
        </div>
    )
})
