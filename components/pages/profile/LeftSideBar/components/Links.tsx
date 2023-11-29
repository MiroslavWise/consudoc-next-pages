import { useRouter } from "next/router"

import { usePush } from "@/hooks/usePath"

import { cx } from "@/lib/cx"
import { useProfile } from "@/store/state"
import { LINKS_PROFILE } from "./constants/links"

import styles from "./styles/style.module.scss"

export function Links() {
    const isDoctor = useProfile(({ isDoctor }) => isDoctor)
    const { handlePush } = usePush()
    const { pathname } = useRouter()

    const handleToLink = (path: string) => handlePush(path)

    return (
        <ul className={styles.containerLinks}>
            {LINKS_PROFILE.map((item) => (
                <li
                    key={`${item.value}_links_profile`}
                    onClick={() => handleToLink(item.value)}
                    className={cx(pathname.includes(item.value) && styles.active)}
                >
                    <span>{item.label}</span>
                </li>
            ))}
            {isDoctor ? (
                <li
                    key={`spec_links_profile`}
                    onClick={() => handleToLink("/specialization")}
                    className={cx(pathname.includes("/specialization") && styles.active)}
                >
                    <span>Специализация</span>
                </li>
            ) : null}
            {isDoctor === false ? (
                <li
                    key={`medical-record-profile`}
                    onClick={() => handleToLink("/medical-record")}
                    className={cx(pathname.includes("/medical-record") && styles.active)}
                >
                    <span>Медицинская карта</span>
                </li>
            ) : null}
        </ul>
    )
}
