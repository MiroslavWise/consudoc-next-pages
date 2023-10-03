import { useEffect } from "react"
import Image from "next/image"
import { useQuery } from "react-query"

import { ItemSpecialization } from "@/components/pages/profile/specialization/components/ItemSpecialization"

import { useProfile } from "@/store/state"
import { usePush } from "@/hooks/usePath"
import { getSpecializations } from "@/services/doctors"

import styles from "./style.module.scss"
import { ProfileLayout } from "@/components/layout/ProfileLayout"

export default function Specializations() {
    const { isDoctor } = useProfile()
    const { handlePush } = usePush()
    const { data, refetch } = useQuery({
        queryFn: () => getSpecializations(),
        queryKey: ["specializations"],
    })

    useEffect(() => {
        if (isDoctor !== undefined && isDoctor === false) {
            handlePush("/doctors")
        }
    }, [isDoctor])

    return (
        <ProfileLayout>
            <div className={styles.wrapper}>
                <header>
                    <h2>Специализации</h2>
                    <div
                        className={styles.buttonAdd}
                        onClick={() => {
                            handlePush(`/specialization/add`)
                        }}
                    >
                        <span>Добавить</span>
                    </div>
                    <Image
                        className={styles.imageAdd}
                        onClick={() => {
                            handlePush(`/specialization/add`)
                        }}
                        src="/svg/file-plus.svg"
                        alt="file-plus"
                        width={30}
                        height={30}
                        unoptimized
                    />
                </header>
                <section>
                    {data?.res && Array.isArray(data?.res)
                        ? data?.res?.map((item) => (
                              <ItemSpecialization
                                  key={`${item.id}-specialization-item`}
                                  {...item}
                                  refetch={refetch}
                              />
                          ))
                        : null}
                </section>
            </div>
        </ProfileLayout>
    )
}
