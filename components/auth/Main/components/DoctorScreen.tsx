"use client"

import { useMemo, useState } from "react"
import { useQuery } from "react-query"

import { ItemDoctor } from "./ItemDoctor"

import { getDoctors } from "@/services/apiDoctors"
import { getSpecializationsAllList } from "@/services/doctors"

import styles from "./styles/doctor-screen.module.scss"
import { DividerVertical } from "@/components/common/Divider"

export const DoctorScreen = () => {
    const [page, setPage] = useState(1)
    const [specId, setSpecId] = useState<number | null>(null)

    const categories = useMemo(() => {
        if (specId) {
            return {
                specialization__id: specId,
            }
        }

        return {}
    }, [specId])

    const { data: dataCategories } = useQuery({
        queryFn: () => getSpecializationsAllList(categories),
        queryKey: ["specializations-all-list", ,],
    })
    const { data } = useQuery({
        queryKey: [
            "doctors",
            `page=${page}`,
            `spec=${categories?.specialization__id || "all"}`,
        ],
        queryFn: () => getDoctors({ page, ...categories }),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    console.log("%c dataCategories: ", "color: red", { dataCategories })

    const list = useMemo(() => {
        return dataCategories?.res || []
    }, [dataCategories])

    return (
        <div className={styles.wrapper}>
            <div data-filters>
                <div data-item-filter>
                    <p>Диапазон стоимости</p>
                    <div data-label-inputs>
                        <label>От:</label>
                        <input
                            type="number"
                            min={0}
                            itemType="number"
                            max={100_000}
                            defaultValue={0}
                        />
                    </div>
                    <div data-label-inputs>
                        <label>До:</label>
                        <input
                            type="number"
                            min={0}
                            itemType="number"
                            max={100_000}
                            defaultValue={100_000}
                        />
                    </div>
                </div>
                <DividerVertical />
                <div data-item-filter data-categories>
                    <p>Выберите специалиста</p>
                    <div data-categories-list>
                        {list.map((item) => (
                            <div
                                key={`${item?.id}-cat`}
                                data-item
                                data-active={item?.id === specId}
                                onClick={() => {
                                    if (item?.id === specId) {
                                        setSpecId(null)
                                    } else {
                                        setSpecId(item?.id!)
                                    }
                                }}
                            >
                                <header>
                                    <h3>{item?.name}</h3>
                                </header>
                                <section>
                                    <p>{item?.description}</p>
                                </section>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <section className={styles.container}>
                {data?.ok && Array.isArray(data?.res?.results)
                    ? data?.res?.results?.map((item: any) => (
                          <ItemDoctor key={item?.id + item?.doctor_id} {...item} />
                      ))
                    : null}
            </section>
        </div>
    )
}
