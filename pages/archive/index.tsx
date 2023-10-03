import { ProfileLayout } from "@/components/layout/ProfileLayout"
import styles from "./style.module.scss"
import { ArchiveContent } from "@/components/pages/profile"

export default function Archives() {
    return (
        <ProfileLayout>
            <div className={styles.wrapper}>
                <header>
                    <h3>Архив консультаций</h3>
                </header>
                <ArchiveContent />
            </div>
        </ProfileLayout>
    )
}
