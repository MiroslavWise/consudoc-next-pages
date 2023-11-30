import dayjs from "dayjs"
import Link from "next/link"
import Image from "next/image"
import { ReactNode, useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { useAuth } from "@/store/state"
import { getProfile } from "@/services/profile"
import { apiListChat } from "@/services/api-chat"
import { photoReplace } from "@/lib/replace-https"

import styles from "../styles/layout-list-chat.module.scss"

export function ListChat({ children }: { children: ReactNode }) {
    const uuid = useSearchParams().get("uuid")
    const token = useAuth(({ token }) => token)


    const { data: dataProfile, isLoading: isLoadingProfile } = useQuery({
        queryFn: () => getProfile(),
        queryKey: ["profile", token],
        enabled: !!token,
        refetchOnReconnect: true,
    })

    const { data, isLoading, refetch } = useQuery({
        queryFn: () => apiListChat(),
        queryKey: ["list-chat", token],
        enabled: !!token,
    })

    const list = useMemo(() => {
        return data?.res || []
    }, [data?.res])

    const myId = useMemo(() => {
        return dataProfile?.res?.profile?.profile_id || null
    }, [dataProfile?.res])

    if (isLoading || isLoadingProfile)
        return (
            <div className={styles.wrapper}>
                <section />
            </div>
        )

    return (
        <div className={styles.wrapper}>
            <section>
                {list.length ? (
                    <ul>
                        {list.map((item) => (
                            <Link href={`/chat?uuid=${item?.uuid}`} data-active={item?.uuid === uuid && typeof uuid === "string"}>
                                <span data-time>
                                    {item?.messages?.length
                                        ? dayjs(item.messages[0]?.updated_at).format("HH:mm DD.MM")
                                        : dayjs(item.updated_at).format("HH:mm DD.MM")}
                                </span>
                                <article>
                                    <Image
                                        src={
                                            myId === item?.doctor?.id
                                                ? photoReplace(item.patient.photo_url)
                                                : photoReplace(item.doctor.photo_url)
                                        }
                                        alt="avatar"
                                        width={40}
                                        height={40}
                                        unoptimized
                                    />
                                    <span>
                                        <h5>{myId === item?.doctor?.id ? item.patient.full_name : item.doctor.full_name}</h5>
                                        <label>{myId === item?.doctor?.id ? item.patient.email : item.doctor.email}</label>
                                    </span>
                                </article>
                                {item?.messages?.length ? <p>{item?.messages[0]?.text}</p> : null}
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p>У вас нет никаких чатов(</p>
                )}
            </section>
            {children}
        </div>
    )
}
