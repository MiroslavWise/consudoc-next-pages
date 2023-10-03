import { useRouter } from "next/router"
import { type ReactNode, useMemo } from "react"

import {
    LINKS,
    LINK_VALUES,
    LinksButtons,
    TLinksValuePay,
} from "@/components/pages/pay-data/components/LinksButtons"
import { ProfileLayout } from "@/components/layout/ProfileLayout"
import { ReferralSystem } from "@/components/pages/pay-data/ReferralSystem"

import stylesLayout from "./layout.module.scss"

export default function PayData() {
    const {
        query: { current },
    } = useRouter()

    const content: ReactNode | null = useMemo(() => {
        if (!LINK_VALUES.includes(current as TLinksValuePay)) return null

        const obj: Record<TLinksValuePay, ReactNode | null> = {
            analytics: null,
            replenishment: null,
            "referral-system": <ReferralSystem />,
        }

        return obj[current as TLinksValuePay]
    }, [current])

    return (
        <ProfileLayout>
            <div className={stylesLayout.wrapper}>
                <section>
                    <header>
                        <h2>Платежные данные</h2>
                    </header>
                    <div>
                        <LinksButtons />
                    </div>
                </section>
                <section>
                    <header>
                        <h2>{LINKS.find((item) => current!?.includes(item.value))?.label}</h2>
                    </header>
                    <div>{content}</div>
                </section>
            </div>
        </ProfileLayout>
    )
}
