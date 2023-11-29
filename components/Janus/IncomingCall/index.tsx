"use client"

import Image from "next/image"
import { useContext, useEffect, useState } from "react"

import { cx } from "@/lib/cx"
import { platform } from "@/lib/platform"
import { replaceHttps } from "@/lib/replace-https"
import { styleIsMobile } from "@/lib/styleIsMobile"
import { useWeb } from "@/context/useWebSocket"
import usePlaySound from "@/hooks/usePlaySound"
import { CreateJanusContext } from "@/context/JanusContext"
import { usePropsCallingJanus } from "@/store/state/useCallJanus"

import styles from "./style.module.scss"

export const IncomingCall = () => {
    const [visible, setVisible] = useState(false)
    const { stop } = usePlaySound()
    const context = useContext(CreateJanusContext)
    const { wsChannel } = useWeb()
    const { incomingDoctorCall } = usePlaySound()
    const call_info = usePropsCallingJanus(({ call_info }) => call_info)
    const doctor_info = usePropsCallingJanus(({ doctor_info }) => doctor_info)
    const user_info = usePropsCallingJanus(({ user_info }) => user_info)
    const setUuidRoom = usePropsCallingJanus(({ setUuidRoom }) => setUuidRoom)
    const setCallInfo = usePropsCallingJanus(({ setCallInfo }) => setCallInfo)
    const setDoctorInfo = usePropsCallingJanus(({ setDoctorInfo }) => setDoctorInfo)
    const setUserInfo = usePropsCallingJanus(({ setUserInfo }) => setUserInfo)
    const deleteAll = usePropsCallingJanus(({ deleteAll }) => deleteAll)

    const { joinAndVisible, createRoom } = context ?? {}

    useEffect(() => {
        if (wsChannel) {
            const listener = (event: any) => {
                const notification: any = JSON.parse(event.data).data
                console.log("notification: ", notification)
                if (notification?.type === "incall") {
                    console.log("notification: ", notification)
                    requestAnimationFrame(() => {
                        incomingDoctorCall()
                    })
                    setCallInfo(notification.call_info)
                    setDoctorInfo(notification.doctor_info)
                    setUserInfo(notification.user_info)
                    setUuidRoom(notification.call_info.uuid)
                    setVisible(true)
                }
                if (
                    ["call_cancel_from_user", "call_accept_cancel"]?.includes(
                        notification?.type
                    )
                ) {
                    deleteAll()
                    setVisible(false)
                }
                if (notification?.type === "call_accept_ok") {
                }
            }
            wsChannel.addEventListener("message", listener)
            return () => wsChannel.removeEventListener("message", listener)
        }
    }, [wsChannel])

    function answer(ans: boolean) {
        stop()
        if (ans) {
            if (joinAndVisible && createRoom) {
                createRoom(Number(call_info?.conf_id!)).finally(() => {
                    joinAndVisible(Number(call_info?.conf_id!))
                })
            }
            wsChannel?.send(
                JSON.stringify({
                    data: {
                        type: "call_accept_ok",
                        doctor_id: doctor_info?.doctor_id,
                        conf_id: Number(call_info?.conf_id),
                        device_type: platform,
                        patient_id: user_info?.profile_id,
                        status: true,
                    },
                })
            )
            setVisible(false)
        } else {
            wsChannel?.send(
                JSON.stringify({
                    data: {
                        type: "call_accept_cancel",
                        doctor_id: doctor_info?.doctor_id,
                        conf_id: Number(call_info?.conf_id),
                        patient_id: user_info?.profile_id,
                        status: false,
                    },
                })
            )
            setVisible(false)
            requestAnimationFrame(() => {
                deleteAll()
            })
        }
    }

    const urlAvatar =
        user_info?.avatar_url?.includes("default") || !user_info?.avatar_url
            ? "/images/default.avif"
            : replaceHttps(user_info?.avatar_url!)

    return (
        <main className={cx(styles.wrapper, styles[styleIsMobile], visible && styles.active)}>
            <section>
                {user_info?.full_name ? (
                    <h2>Входящий вызов от: {user_info?.full_name}</h2>
                ) : null}
                {urlAvatar ? (
                    <Image
                        src={urlAvatar}
                        alt="avatar"
                        width={400}
                        height={400}
                        className={styles.avatar}
                        unoptimized
                    />
                ) : null}
                {call_info?.specialization ? (
                    <h3>
                        Специализация: {call_info?.specialization}{" "}
                        <span>(Сеанс: {call_info?.sessions_time.replace("min", " мин")})</span>
                    </h3>
                ) : null}
                <i>(Качество разговора с пациентом зависит от вашего интернет-соединения)</i>
                <footer>
                    <button data-access onClick={() => answer(true)}>
                        <span>Принять</span>
                    </button>
                    <button data-error onClick={() => answer(false)}>
                        <span>Отклонить</span>
                    </button>
                </footer>
            </section>
        </main>
    )
}
