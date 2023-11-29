import { useQuery } from "@tanstack/react-query"

import { getProfile } from "@/services/profile"
import { useAuth } from "@/store/state/useAuth"
import { apiPostReferralLinkBuy, apiReferralPrice } from "@/services/api-referral"
import { useVisibleModalReferral } from "@/store/state/useVisibleModalReferral"

import styles from "./style.module.scss"

export const ModalReferral = () => {
    const token = useAuth(({ token }) => token)
    const text = useVisibleModalReferral(({ text }) => text)
    const visible = useVisibleModalReferral(({ visible }) => visible)
    const dispatchVisibleReferral = useVisibleModalReferral(({ dispatchVisibleReferral }) => dispatchVisibleReferral)

    const { refetch } = useQuery({
        queryFn: () => getProfile(),
        queryKey: ["profile-me", token!],
        enabled: false,
    })
    const { refetch: refetchReferral } = useQuery({
        queryFn: () => apiReferralPrice(),
        queryKey: ["referral-price"],
        enabled: false,
    })

    function handle() {
        apiPostReferralLinkBuy()
            .then((response) => {
                if (!!response?.res?.id) {
                    refetch()
                    refetchReferral()
                }
            })
            .finally(() => {
                dispatchVisibleReferral({ visible: false })
            })
    }

    return (
        <div className={styles.wrapper} data-visible={visible}>
            <section>
                <div
                    data-close
                    onClick={() => {
                        dispatchVisibleReferral({ visible: false })
                    }}
                >
                    <img src="/svg/x-close.svg" alt="X" width={16} height={16} />
                </div>
                <h3>{text}</h3>
                <button className="button-default-primary" onClick={handle}>
                    <span>Купить</span>
                </button>
                <button
                    className="button-default-primary"
                    data-button-close
                    onClick={() => {
                        dispatchVisibleReferral({ visible: false })
                    }}
                >
                    <span>Отмена</span>
                </button>
            </section>
        </div>
    )
}
