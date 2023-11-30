"use client"

import { FC, memo } from "react"
import Image from "next/image"
import { isMobile } from "react-device-detect"

import { cx } from "@/lib/cx"
import { stylesBlockRight } from "@/lib/styles-block-message"
import { timeNowOrBeforeChat } from "@/lib/timeNowOrBefore"

import { photoReplace } from "@/lib/replace-https"

import styles from "../styles/item-message.module.scss"

interface IItemMessage {
    photo: string
    messages: {
        id: string
        text: string
        time: Date | string
    }[]
}

type TItemMessage = FC<IItemMessage>

export const ItemUserMessage: TItemMessage = memo(function $ItemUserMessage({ photo, messages }) {
    return (
        <li className={styles.containerItemUserMessage}>
            {!isMobile ? (
                <Image className={styles.avatar} height={30} width={30} src={photoReplace(photo)} alt="avatar" unoptimized />
            ) : null}
            <div className={styles.messages}>
                {messages?.map((item, index) => (
                    <div
                        className={cx(styles.blockMessage, styles[stylesBlockRight(messages?.length!, index)])}
                        key={`${item.id}_${item.text}`}
                        id={`${item.id!}`}
                    >
                        <p>{item.text}</p>
                        <p className={styles.time}>{timeNowOrBeforeChat(item?.time!)}</p>
                    </div>
                ))}
            </div>
        </li>
    )
})
