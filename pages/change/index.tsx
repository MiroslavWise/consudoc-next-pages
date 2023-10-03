import { FormChange } from "@/components/pages/profile"
import { ProfileLayout } from "@/components/layout/ProfileLayout"

import { cx } from "@/lib/cx"
import { styleIsMobile } from "@/lib/styleIsMobile"

import styles from "./style.module.scss"

export default function ChangeProfile() {
    return (
        <ProfileLayout>
            <section className={cx(styles.wrapper, styles[styleIsMobile])}>
                <header>
                    <h3>Редактировать профиль</h3>
                </header>
                <FormChange />
            </section>
        </ProfileLayout>
    )
}
