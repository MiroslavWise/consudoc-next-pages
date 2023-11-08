import { Rate } from "antd"
import Image from "next/image"

import type { TItemDoctor } from "./types/types"

import styles from "./styles/doctor-screen.module.scss"

export const ItemDoctor: TItemDoctor = ({ profile, spec_rating }) => {
    const { full_name, avatar_url } = profile ?? {}

    return (
        <div className={styles.itemContainer}>
            <Image src={avatar_url} alt="avatar" width={275} height={298} unoptimized />
            <div className={styles.title}>
                <p>{full_name ? full_name : null}</p>
                <Rate defaultValue={Number(spec_rating)} disabled allowHalf />
            </div>
        </div>
    )
}
