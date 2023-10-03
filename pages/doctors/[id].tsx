import { useEffect } from "react"
import Image from "next/image"
import { useQuery } from "react-query"
import { useRouter } from "next/router"

import type { TStatus } from "@/store/types/useFilters"

import { Feedbacks, ItemSpecialization } from "@/components/pages/doctors"

import { cx } from "@/lib/cx"
import { status } from "@/lib/status"
import { useWeb } from "@/context/useWebSocket"
import { getDoctorId } from "@/services/apiDoctors"

import styles from "./style-id.module.scss"

export default function DoctorID() {
    const {
        query: { id },
    } = useRouter()
    const { wsChannel } = useWeb()
    const { data, isLoading, refetch } = useQuery({
        queryFn: () => getDoctorId(Number(id)),
        queryKey: ["doctor", id],
    })
    useEffect(() => {
        const eventUpdate = (event: MessageEventInit<any>) => {
            const lastMessage: any = JSON.parse(event?.data)
            if (lastMessage?.data?.type === "update_doctor_list") {
                refetch()
            }
        }

        if (wsChannel) {
            wsChannel?.addEventListener("message", eventUpdate)
        }

        return () => wsChannel?.removeEventListener("message", eventUpdate)
    }, [wsChannel])

    if (isLoading) return <></>

    return (
        <div className={styles.wrapper}>
            <section>
                <header>
                    <div className={styles.title}>
                        <Image
                            src={
                                data?.res?.profile?.photo_url! ||
                                data?.res?.profile?.avatar_url!
                            }
                            unoptimized
                            alt="avatar"
                            height={400}
                            width={400}
                        />
                        <div>
                            <h3>{data?.res?.profile?.full_name}</h3>
                            <div
                                className={cx(
                                    styles.status,
                                    styles[data?.res?.profile?.status!]
                                )}
                            >
                                <span>
                                    {status[data?.res?.profile?.status! as TStatus] as string}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
                <div className={styles.infoContainer}>
                    <header>
                        <h3>Специализации</h3>
                    </header>
                    <section>
                        {data?.res && Array.isArray(data?.res?.get_all_specialization)
                            ? data?.res?.get_all_specialization?.map((item) => (
                                  <ItemSpecialization
                                      key={`${item.id}-specialization`}
                                      {...item}
                                  />
                              ))
                            : null}
                    </section>
                </div>
                <div className={styles.infoContainer}>
                    <header>
                        <h3>Отзывы</h3>
                    </header>
                    <Feedbacks />
                </div>
            </section>
        </div>
    )
}
