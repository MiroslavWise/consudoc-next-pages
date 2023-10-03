import { ProfileLayout } from "@/components/layout/ProfileLayout"
import { FormChangeSpecialization } from "@/components/pages/profile/specialization/components/FormChangeSpecialization"

import { usePush } from "@/hooks/usePath"

import styles from "./style-modification.module.scss"

export default function SpecializationModification() {
    const { handlePush } = usePush()

    return (
        <ProfileLayout>
            <div className={styles.wrapper}>
                <header>
                    <h3>Редактирование</h3>
                    <div
                        className={styles.buttonCancel}
                        onClick={() => handlePush("/specialization")}
                    >
                        <span>Отмена</span>
                    </div>
                </header>
                <section>
                    <FormChangeSpecialization />
                </section>
            </div>
        </ProfileLayout>
    )
}
