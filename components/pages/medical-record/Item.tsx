import type { TItemMedicalRecord } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/item.module.scss"
import Image from "next/image"
import { usePush } from "@/hooks/usePath"
import { DividerHorizontal } from "@/components/common/Divider"

export const ItemMedicalRecord: TItemMedicalRecord = ({
    profile_doctor,
    text,
    conference,
}) => {
    const { uuid } = conference ?? {}
    const { full_name, avatar_url } = profile_doctor ?? {}
    const { handlePush } = usePush()

    function onVisit() {
        handlePush(`/archive?uuid=${uuid}`)
    }

    return (
        <li className={cx(styles.container)}>
            <header>
                <Image src={avatar_url!} alt="avatar" width={400} height={400} unoptimized />
                <h3>{full_name || ""}</h3>
            </header>
            <section>
                <h3>Рекомендация от доктора:</h3>
                <p>{text}</p>
            </section>
            <DividerHorizontal />
            <footer>
                <p>Посмотреть в архиве:</p>
                <a onClick={onVisit}>Перейти</a>
            </footer>
        </li>
    )
}
