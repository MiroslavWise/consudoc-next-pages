"use client"

import dayjs from "dayjs"
import { useEffect } from "react"
import { useQuery } from "react-query"

import { DividerVertical } from "@/components/common/Divider"

import { usePush } from "@/hooks/usePath"
import { getArchives } from "@/services/doctors"
import { useArchive, useProfile } from "@/store/state"

import styles from "./styles/list.module.scss"

export function ArchiveList() {
    const { isDoctor } = useProfile()
    const { handlePush } = usePush()

    const { page, setTotal } = useArchive()
    const { data, isLoading } = useQuery({
        queryFn: () => getArchives({ page: page }),
        queryKey: ["archive", page],
    })

    useEffect(() => {
        if (data?.res) {
            setTotal(data?.res?.count)
        }
    }, [data?.res])

    return (
        <ul className={styles.container}>
            {data?.res ? (
                data?.res?.results?.map((item) => (
                    <li
                        key={`${item.uuid}_archive`}
                        onClick={() => handlePush(`/archive?uuid=${item.uuid}`)}
                    >
                        <h4>
                            {isDoctor
                                ? item?.patient_profile?.full_name
                                : item?.doctor?.profile?.full_name}
                        </h4>
                        <DividerVertical classNames={[styles.divider]} />
                        <div className={styles.price}>
                            <p>стоимость:</p>
                            <a>{item.price_service}₸</a>
                        </div>
                        <DividerVertical classNames={[styles.divider]} />
                        <div className={styles.circulationDate}>
                            <p>дата обращения:</p>
                            <a>
                                {item?.created_at
                                    ? dayjs(item?.created_at).format("HH:mm DD.MM.YY")
                                    : null}
                            </a>
                        </div>
                        <DividerVertical classNames={[styles.divider]} />
                        <a className={styles.linkToPageId}>посмотреть</a>
                    </li>
                ))
            ) : isLoading ? (
                <>
                    <div className={styles.liLoading} />
                    <div className={styles.liLoading} />
                    <div className={styles.liLoading} />
                    <div className={styles.liLoading} />
                    <div className={styles.liLoading} />
                </>
            ) : null}
        </ul>
    )
}
