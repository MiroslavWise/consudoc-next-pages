"use client"

import { Rate } from "antd/lib"
import { useState } from "react"
import Image from "next/image"

import { cx } from "@/lib/cx"
import { useProfile } from "@/store/state"
import { replaceHttps } from "@/lib/replace-https"
import { styleIsMobile } from "@/lib/styleIsMobile"
import { useFeedback } from "@/store/state/useFeedback"
import { usePropsCallingJanus } from "@/store/state/useCallJanus"
import { setDoctorFeedback, setDoctorReviewToPatient } from "@/services/apiCallJanus"

import styles from "./style.module.scss"

export const Feedback = () => {
    const [text, setText] = useState("")
    const [rate, setRate] = useState<number>(undefined!)
    const isDoctor = useProfile(({ isDoctor }) => isDoctor)
    const profile = useProfile(({ profile }) => profile)
    const isVisible = useFeedback(({ isVisible }) => isVisible)
    const setIsVisible = useFeedback(({ setIsVisible }) => setIsVisible)
    const doctor_info = usePropsCallingJanus(({ doctor_info }) => doctor_info)
    const user_info = usePropsCallingJanus(({ user_info }) => user_info)
    const deleteAll = usePropsCallingJanus(({ deleteAll }) => deleteAll)
    const idRoom = usePropsCallingJanus(({ idRoom }) => idRoom)

    function handleCancel() {
        deleteAll()
        setIsVisible(false)
        setText("")
        setRate(undefined!)
        setTimeout(() => {
            location.reload()
        }, 110)
    }

    async function sendReview() {
        if (isDoctor) {
            const data = {
                doctor: profile?.profile_id,
                patient: user_info?.profile_id,
                conference: Number(idRoom),
                text: text,
            }
            console.log("setDoctorReviewToPatient: ", data)
            await setDoctorReviewToPatient(data).finally(() => {
                handleCancel()
            })
        } else {
            const data = {
                doctor: doctor_info?.profile_id,
                author: profile?.profile_id,
                conference: Number(idRoom),
                rating: rate || 3.5,
                text: text,
            }
            console.log("setDoctorFeedback: ", data)
            await setDoctorFeedback(data).finally(() => {
                handleCancel()
            })
        }
    }

    const urlAvatar =
        doctor_info?.avatar_url?.includes("default") || !doctor_info?.avatar_url
            ? "/images/default.avif"
            : replaceHttps(doctor_info?.avatar_url!)
    const urlPatient =
        user_info?.avatar_url?.includes("default") || !user_info?.avatar_url
            ? "/images/default.avif"
            : replaceHttps(user_info?.avatar_url!)

    return (
        <main
            className={cx(styles.wrapper, styles[styleIsMobile], isVisible && styles.active)}
        >
            <section>
                <header>
                    <h2>{isDoctor ? "Рекомендации пациенту" : "Оставьте отзыв о докторе"}</h2>
                </header>
                <Image
                    src={isDoctor ? urlPatient : urlAvatar}
                    alt="avatar"
                    width={400}
                    height={400}
                    className={styles.avatar}
                    unoptimized
                />
                <h4>{isDoctor ? user_info?.full_name : doctor_info?.full_name}</h4>
                <textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder={
                        isDoctor
                            ? "Напишите рекомендацию пациенту"
                            : "Напишите отзыв о докторе"
                    }
                />
                {!isDoctor ? (
                    <div className={styles.rate}>
                        <h4>Дайте вашу оценку:</h4>
                        <Rate onChange={setRate} value={rate || 0} />
                    </div>
                ) : null}
                <footer>
                    <button data-error onClick={handleCancel}>
                        <span>Отмена</span>
                    </button>
                    <button data-access onClick={sendReview}>
                        <span>Отправить</span>
                    </button>
                </footer>
            </section>
        </main>
    )
}
