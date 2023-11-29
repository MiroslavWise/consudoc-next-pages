"use client"

import { Rate } from "antd/lib"
import Image from "next/image"

import type { TItemSpecialization } from "./types/types"

import { cx } from "@/lib/cx"
import { platform } from "@/lib/platform"
import { workExperience } from "@/lib/work-exp"
import { useWeb } from "@/context/useWebSocket"
import { useOutgoingCall, useProfile } from "@/store/state"

import styles from "./styles/item-specialization.module.scss"

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
    const profileMy = useProfile(({ profile }) => profile)
    const setState = useOutgoingCall(({ setState }) => setState)

    // function startEndTimer(value: boolean) {
    //     const timer = setTimeout(() => {}, 60 * 1000)
    // }

    function onCall() {
        if (wsChannel) {
            wsChannel.send(
                JSON.stringify({
                    data: {
                        type: "user_call",
                        time_id: consultation_time?.find(
                            (item) => item.sessions_time === "20min"
                        )?.id,
                        spec_id: specialization_id,
                        device_type: platform,
                        doctor_profile_id: profile?.id,
                        profile_id: profileMy?.profile_id,
                        note_id: false,
                    },
                })
            )
        }
    }

    function handleCall() {
        if (profile?.status === "online") {
            onCall()
            setState({
                visible: true,
                name: profile?.full_name!,
                avatar: profile?.avatar_url!,
                session: consultation_time
                    ?.find((item) => item.sessions_time === "20min")
                    ?.sessions_time?.replace("min", " мин")!,
                specialization: specialization?.name!,
                profileIdDoctor: profile?.id,
            })
        }
    }

    return (
        <div className={styles.container}>
            <header>
                <div className={styles.title}>
                    <h4>{specialization?.name}</h4>
                </div>
                <div
                    className={cx(
                        styles.videoCall,
                        profile?.status === "online" && styles.online
                    )}
                    onClick={handleCall}
                >
                    <Image
                        src={
                            profile?.status === "online"
                                ? "/svg/video.svg"
                                : "/svg/video-red.svg"
                        }
                        alt="video"
                        width={22}
                        height={14}
                    />
                    <a>видеозвонок</a>
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
                            {item.sessions_time?.replace("min", " мин")} /{" "}
                            <b>{item?.price}₸</b>
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
