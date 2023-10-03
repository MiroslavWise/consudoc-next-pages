"use client"

import { Rate } from "antd"
import Image from "next/image"
import { isMobile } from "react-device-detect"

import { TItem } from "./types"

import { DividerVertical } from "@/components/common/Divider"

import { cx } from "@/lib/cx"
import { status } from "@/lib/status"
import { usePush } from "@/hooks/usePath"
import { styleIsMobile } from "@/lib/styleIsMobile"

import styles from "./styles/item.module.scss"

export const Item: TItem = (props) => {
    const {
        consultation_time,
        id,
        profile,
        doctor_id,
        spec_rating,
        specialization,
        specialization_id,
        isLoading,
    } = props ?? {}

    const { handlePush } = usePush()

    return (
        <li
            className={cx(styles.container, styles[styleIsMobile])}
            onClick={() => handlePush(`/doctors/${doctor_id}`)}
        >
            {!isMobile && (
                <>
                    <div className={cx(styles.status, styles[profile?.status!])}>
                        <span>{status[profile?.status!]}</span>
                    </div>
                    <DividerVertical />
                </>
            )}
            <Image
                src={profile?.avatar_url!}
                alt="avatar"
                height={400}
                width={400}
                unoptimized
                className={styles.avatar}
            />
            <DividerVertical />
            <h4>{profile?.full_name}</h4>
            <DividerVertical />
            <div className={styles.rate}>
                {!isMobile && <Rate defaultValue={Number(spec_rating)} disabled allowHalf />}
                <p>{spec_rating}/5</p>
            </div>
            <div className={cx(styles.statusVertical, styles[profile?.status])} />
        </li>
    )
}
