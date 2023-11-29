"use client"

import { Rate } from "antd/lib"
import Image from "next/image"

import type { TItemSpecialization } from "./types/types"

import { cx } from "@/lib/cx"
import { platform } from "@/lib/platform"
import { workExperience } from "@/lib/work-exp"
import { useWeb } from "@/context/useWebSocket"
import { useAuth, useOutgoingCall, useProfile } from "@/store/state"

import styles from "./styles/item-specialization.module.scss"
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/services/profile"
import { usePush } from "@/hooks/usePath"

export const ItemSpecialization: TItemSpecialization = ({
    consultation_time,
    profile,
    rating,
    specialization,
    specialization_id,
    university,
    work_experience,
}) => {
    const { wsChannel } = useWeb()
    const { handlePush } = usePush()
    const token = useAuth(({ token }) => token)
    const setState = useOutgoingCall(({ setState }) => setState)

    const { data, isLoading } = useQuery({
        queryFn: () => getProfile(),
        queryKey: ["profile", token],
        enabled: !!token,
        refetchOnReconnect: true,
    })

    function onCall() {
        if (wsChannel) {
            wsChannel.send(
                JSON.stringify({
                    data: {
                        type: "user_call",
                        time_id: consultation_time?.find((item) => item.sessions_time === "20min")?.id,
                        spec_id: specialization_id,
                        device_type: platform,
                        doctor_profile_id: profile?.id,
                        profile_id: data?.res?.profile?.profile_id,
                        note_id: false,
                    },
                })
            )
        }
    }

    function handleCall() {
        if (profile?.status === "online") {
            if (
                Number(data?.res?.profile?.balance?.current_balance!) >=
                Number(consultation_time?.find((item) => item.sessions_time === "20min")?.price)
            ) {
                onCall()
                setState({
                    visible: true,
                    name: profile?.full_name!,
                    avatar: profile?.avatar_url!,
                    session: consultation_time?.find((item) => item.sessions_time === "20min")?.sessions_time?.replace("min", " мин")!,
                    specialization: specialization?.name!,
                    profileIdDoctor: profile?.id,
                })
            } else if (
                Number(data?.res?.profile?.balance?.current_balance!) <=
                Number(consultation_time?.find((item) => item.sessions_time === "20min")?.price)
            ) {
                handlePush(
                    `/pay-data?current=replenishment&amount-min=${
                        +Number(consultation_time?.find((item) => item.sessions_time === "20min")?.price)?.toFixed(0) -
                        +Number(data?.res?.profile?.balance?.current_balance!)?.toFixed(0)
                    }`
                )
            }
        }
    }

    return (
        <div className={styles.container}>
            <header>
                <div className={styles.title}>
                    <h4>{specialization?.name}</h4>
                </div>
                <div className={cx(styles.videoCall, styles[profile?.status])} onClick={handleCall}>
                    <Image
                        src={profile?.status === "online" ? "/svg/video.svg" : "/svg/video-red.svg"}
                        alt="video"
                        width={22}
                        height={14}
                    />
                    <a>
                        {profile?.status === "online" &&
                        Number(data?.res?.profile?.balance?.current_balance!) >=
                            Number(consultation_time?.find((item) => item.sessions_time === "20min")?.price)
                            ? "видеозвонок"
                            : Number(data?.res?.profile?.balance?.current_balance!) <=
                              Number(consultation_time?.find((item) => item.sessions_time === "20min")?.price)
                            ? "пополнить"
                            : null}
                    </a>
                </div>
            </header>
            <section>
                {specialization?.description ? (
                    <p>
                        Описание: <span>{specialization?.description}</span>
                    </p>
                ) : null}
                {university && (
                    <p>
                        ВУЗ: <span>{university}</span>
                    </p>
                )}
                <p>
                    Стаж: <span>{workExperience(work_experience, (value) => value)}</span>
                </p>
                <p>
                    Категория: <span>Нет категории</span>
                </p>
                <p>
                    Время и цена:{" "}
                    {consultation_time?.map((item) => (
                        <span key={`${item.id}-${item.price}-time-price`}>
                            {item.sessions_time?.replace("min", " мин")} / <b>{item?.price}₸</b>
                        </span>
                    ))}
                </p>
                <p>
                    Рейтинг: <Rate value={Number(rating)} disabled />
                </p>
            </section>
        </div>
    )
}
