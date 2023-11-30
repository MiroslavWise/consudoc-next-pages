import Link from "next/link"
import { useRouter } from "next/router"

import { useProfile } from "@/store/state"
import { LINKS_PROFILE } from "./constants/links"

import styles from "./styles/style.module.scss"

export function Links() {
    const isDoctor = useProfile(({ isDoctor }) => isDoctor)
    const { pathname } = useRouter()

    return (
        <ul className={styles.containerLinks}>
            {LINKS_PROFILE.map((item) => (
                <Link key={`${item.value}_links_profile`} href={item.value} data-active={pathname.includes(item.value)}>
                    <span>{item.label}</span>
                </Link>
            ))}
            <Link href="/chat" data-active={pathname.includes("/chat")}>
                <span>Чат</span>
            </Link>
            {isDoctor ? (
                <Link data-active={pathname.includes("/specialization")} key={`spec_links_profile`} href="/specialization">
                    <span>Специализация</span>
                </Link>
            ) : null}
            {isDoctor === false ? (
                <Link href="/medical-record" data-active={pathname.includes("/medical-record")} key={`medical-record-profile`}>
                    <span>Медицинская карта</span>
                </Link>
            ) : null}
        </ul>
    )
}
