"use client"

import dayjs from "dayjs"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { DividerVertical } from "@/components/common/Divider"

import { useProfile } from "@/store/state"
import { getArchive } from "@/services/doctors"

import styles from "./style.module.scss"
import Image from "next/image"

export function ArchiveCurrent() {
    const searchParams = useSearchParams()
    const idArchive = searchParams.get("uuid")
    const isDoctor = useProfile(({ isDoctor }) => isDoctor)

    const { data, isLoading } = useQuery({
        queryFn: () => getArchive(idArchive!),
        queryKey: ["archive", idArchive!],
        refetchOnWindowFocus: false,
    })

    if (isLoading) return <></>

    function whoIs(): { avatar: string; who: string } {
        if (isDoctor && data?.res?.patient_profile) {
            return {
                avatar: data?.res?.patient_profile?.photo_url,
                who: data?.res?.patient_profile?.full_name! || "",
            }
        }

        if (!isDoctor && data?.res?.doctor) {
            return {
                avatar: data?.res?.doctor?.profile?.photo_url,
                who: data?.res?.doctor?.profile?.full_name! || "",
            }
        }

        return { avatar: "", who: "" }
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <div className={styles.circulationDate}>
                    {whoIs().avatar ? (
                        <Image
                            src={whoIs().avatar}
                            alt="avatar"
                            height={400}
                            width={400}
                            unoptimized
                        />
                    ) : null}
                    <a>{whoIs().who}</a>
                </div>
                <DividerVertical classNames={[styles.divider]} />
                <div className={styles.circulationDate}>
                    <p>дата обращения:</p>
                    <a>
                        {data?.res?.created_at
                            ? dayjs(data?.res?.created_at).format("HH:mm DD.MM.YY")
                            : null}
                    </a>
                </div>
                <DividerVertical classNames={[styles.divider]} />
                <div className={styles.circulationDate}>
                    <p>длительность:</p>
                    <a>{data?.res?.conference_time?.sessions_time?.replace("min", " мин")}</a>
                </div>
            </header>
            <div className={styles.container}>
                {data?.res?.record_url ? <video controls src={data?.res?.record_url} /> : null}
            </div>
        </div>
    )
}
