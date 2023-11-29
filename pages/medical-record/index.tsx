import { useQuery } from "@tanstack/react-query"

import { ProfileLayout } from "@/components/layout/ProfileLayout"
import { ItemMedicalRecord } from "@/components/pages/medical-record/Item"

import { cx } from "@/lib/cx"
import { getDoctorRemark } from "@/services/profile"

import styles from "./styles.module.scss"

export default function MedicalRecord() {
    const { data, isLoading } = useQuery({
        queryFn: () => getDoctorRemark(),
        queryKey: ["doctor-remark"],
    })

    return (
        <ProfileLayout>
            <div className={cx(styles.wrapper)}>
                <header>
                    <h2>Медицинская карта</h2>
                </header>
                <section>
                    {data?.res && Array.isArray(data?.res) && data?.res?.length === 0 ? (
                        <h4>У вас нет рекомендаций от врачей</h4>
                    ) : Array.isArray(data?.res) ? (
                        data?.res?.map((item) => (
                            <ItemMedicalRecord key={`${item.id}-record-medical`} {...item} />
                        ))
                    ) : null}
                </section>
            </div>
        </ProfileLayout>
    )
}
