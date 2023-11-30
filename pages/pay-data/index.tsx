import { useSearchParams } from "next/navigation"

import { Orders } from "@/components/pages/pay-data/Orders"
import { OrderId } from "@/components/pages/pay-data/OrderId"
import { ProfileLayout } from "@/components/layout/ProfileLayout"
import { Replenishment } from "@/components/pages/pay-data/Replenishment"
import { ReferralSystem } from "@/components/pages/pay-data/ReferralSystem"
import { LINKS, LinksButtons, TLinksValuePay } from "@/components/pages/pay-data/components/LinksButtons"

import stylesLayout from "./layout.module.scss"

export default function PayData() {
    const search = useSearchParams()
    const current = search.get("current") as TLinksValuePay
    const orderId = search.get("order-id")

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
                    <div>
                        {current === "replenishment" ? (
                            <Replenishment />
                        ) : current === "referral-system" ? (
                            <ReferralSystem />
                        ) : orderId || current === "order" ? (
                            <OrderId />
                        ) : null}
                    </div>
                </section>
                {current === "order" ? <Orders /> : null}
            </div>
        </ProfileLayout>
    )
}
