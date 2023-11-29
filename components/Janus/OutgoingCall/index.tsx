"use client"

import { useEffect } from "react"

import { cx } from "@/lib/cx"
import Image from "next/image"
import { useWeb } from "../../../context/useWebSocket"
import { styleIsMobile } from "@/lib/styleIsMobile"
import { useOutgoingCall, useProfile } from "@/store/state"

import styles from "./style.module.scss"

export const OutgoingCall = () => {
    const isDoctor = useProfile(({ isDoctor }) => isDoctor)
    const profile = useProfile(({ profile }) => profile)
    const state = useOutgoingCall(({ state }) => state)
    const setState = useOutgoingCall(({ setState }) => setState)
    const { wsChannel } = useWeb()

    async function onCancelCall(): Promise<void> {
        if (wsChannel) {
            return wsChannel?.send(
                JSON.stringify({
                    data: {
                        type: "call_cancel_user",
                        doctor_profile_id: state?.profileIdDoctor!,
                        patient_id: profile?.profile_id,
                        status: false,
                    },
                })
            )
        }
        return
    }

    function eventMessage(event: any) {
        const data = JSON.parse(event.data).data
        if (data?.type === "call_accept_ok") setState()
    }

    useEffect(() => {
        const cancel = (event: any) => {
            const message_ = JSON.parse(event?.data)
            if (message_?.data?.type === "call_accept_cancel") {
                setState()
                // requestAnimationFrame(() => {
                // onCancelSpeakerCall()
                // })
            }
        }

        wsChannel?.addEventListener("message", eventMessage)
        wsChannel?.addEventListener("message", cancel)

        return () => wsChannel?.removeEventListener("message", cancel)
    }, [wsChannel])

    function handleCancel() {
        onCancelCall().finally(setState)
    }

    return !isDoctor ? (
        <main
            className={cx(
                styles.wrapper,
                styles[styleIsMobile],
                state?.visible && styles.active
            )}
        >
            <section>
                {state?.avatar ? (
                    <Image
                        src={state?.avatar}
                        alt="avatar"
                        width={400}
                        height={400}
                        className={styles.avatar}
                        unoptimized
                    />
                ) : null}
                {state?.name ? (
                    <h3>
                        Ожидание ответа от: <i>{state?.name}</i>
                    </h3>
                ) : null}
                {state?.specialization ? (
                    <h3>
                        Специализация: <i>{state?.specialization}</i>
                    </h3>
                ) : null}
                {state?.session ? (
                    <h3>
                        Сессия <i>{state?.session}</i>
                    </h3>
                ) : null}
                <div className={styles.blockAlert}>
                    <h3>Идёт соединение</h3>
                    <h4>
                        Подождите немного - не закрывайте приложение и не блокируйте телефон
                    </h4>
                    <h4>
                        Время ответа доктора зависит от качества вашего интернет-соединения
                    </h4>
                </div>
                <footer>
                    <button onClick={handleCancel} data-error>
                        <span>Отмена</span>
                    </button>
                </footer>
            </section>
        </main>
    ) : null
}
