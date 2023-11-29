import { useRouter } from "next/router"

import { OrderId } from "@/components/pages/pay-data/OrderId"
import { ProfileLayout } from "@/components/layout/ProfileLayout"
import { Replenishment } from "@/components/pages/pay-data/Replenishment"
import { ReferralSystem } from "@/components/pages/pay-data/ReferralSystem"
import { LINKS, LinksButtons } from "@/components/pages/pay-data/components/LinksButtons"

import stylesLayout from "./layout.module.scss"
import { useSearchParams } from "next/navigation"

export default function PayData() {
    const orderId = useSearchParams().get("order-id")
    const {
        query: { current },
    } = useRouter()

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
                        ) : !!orderId ? (
                            <OrderId />
                        ) : null}
                    </div>
                </section>
            </div>
        </ProfileLayout>
    )
}
