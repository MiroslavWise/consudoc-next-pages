"use client"

import { useEffect, useMemo } from "react"
import { Pagination } from "antd"
import { useQuery } from "react-query"

import { Item } from "./components/Item"
import { ItemLoading } from "./components/ItemLoading"

import { cx } from "@/lib/cx"
import { styleIsMobile } from "@/lib/styleIsMobile"
import { useFilters } from "@/store/state/useFilters"
import { getDoctors } from "@/services/apiDoctors"
import { useWeb } from "@/context/useWebSocket"
import { IDataDoctor } from "@/store/types/useFilters"

import styles from "./style.module.scss"

export const ListDoctors = () => {
    const { wsChannel } = useWeb()
    const { filters, total, setTotal, setPage } = useFilters()

    const filter: Record<string, any> = useMemo(() => {
        return {
            page: filters.page,
            price_gte: filters.price_gte,
            price_lte: filters.price_lte,
            doctor__status: filters.doctor__status,
        }
    }, [filters])

    const { data, isLoading, refetch } = useQuery({
        queryFn: () => getDoctors(filter),
        queryKey: [
            "doctors",
            filter.page,
            filter.price_gte,
            filter.price_lte,
            filter.doctor__status,
        ],
        refetchOnWindowFocus: false,
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

    const list: IDataDoctor[] = useMemo(() => {
        if (data?.ok && data?.res) {
            setTotal(data?.res?.count)
        }

        return data?.res?.results || []
    }, [data?.res, data?.ok])

    return (
        <section className={cx(styles.wrapper, styles[styleIsMobile])}>
            <ul>
                {isLoading ? (
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                        <ItemLoading key={`item-loading-${item}`} />
                    ))
                ) : list?.length > 0 ? (
                    list.map((item) => (
                        <Item key={`${item.id}_doctor`} {...item} isLoading={isLoading} />
                    ))
                ) : (
                    <p>
                        Извините, по вашему запросу нет подходящих докторов, но, использовав
                        другие параметры поиска, вы можете найти себе подходящего для
                        разрешения вашего вопроса
                    </p>
                )}
                {total ? (
                    <div className={styles.pagination}>
                        <Pagination
                            total={total}
                            pageSize={10}
                            showSizeChanger={false}
                            current={filter.page}
                            onChange={setPage}
                            size="small"
                        />
                    </div>
                ) : null}
            </ul>
        </section>
    )
}
