import { getProfile } from "@/services/profile"
import { useAuth } from "@/store/state"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"

export default function Order() {
    const { push } = useRouter()
    const token = useAuth(({ token }) => token)
    const orderId = useSearchParams().get("order-id")

    const { data: dataProfile } = useQuery({
        queryFn: () => getProfile(),
        queryKey: ["profile", token],
        enabled: !!token,
        refetchOnReconnect: true,
    })

    const idOrder = useMemo(() => {
        if (!orderId) {
            return null
        }
        if (orderId) {
            return orderId?.toString()?.split("&order-id=")?.[0]!
        }
    }, [orderId])

    useEffect(() => {
        if (dataProfile?.res?.profile && idOrder) {
            if (dataProfile?.res?.profile?.user?.is_doctor) {
                push(`/archive?order-id=${idOrder}`, undefined)
            } else if (dataProfile?.res?.profile?.user?.is_doctor === false) {
                push(`/teachers?order-id=${idOrder}`, undefined)
            }
        }
    }, [dataProfile, idOrder])

    return <></>
}
