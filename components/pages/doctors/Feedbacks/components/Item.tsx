import dayjs from "dayjs"
import { Rate } from "antd/lib"
import Image from "next/image"

import { TItem } from "./types/types"

import styles from "./styles/item.module.scss"

export const Item: TItem = (props) => {
    const { author, created_at, id, rating, doctor, text } = props ?? {}
    return (
        <div className={styles.container}>
            <header>
                <Rate defaultValue={Number(rating)} disabled allowHalf />
                <i>{dayjs(created_at).format("HH:mm DD.MM.YY")}</i>
            </header>
            <div className={styles.content}>
                <p>{text}</p>
            </div>
            <footer>
                <Image
                    src={author?.avatar_url!}
                    alt="avatar"
                    height={67}
                    width={67}
                    unoptimized
                />
                <p>{author?.full_name}</p>
            </footer>
        </div>
    )
}
