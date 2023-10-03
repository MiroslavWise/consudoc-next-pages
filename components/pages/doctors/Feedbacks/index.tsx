import { useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "next/navigation"

import { getFeedbackDoctorId } from "@/services/apiDoctors"

import styles from "./style.module.scss"
import { Item } from "./components/Item"

export const Feedbacks = () => {
    const params = useParams()
    const { id } = params ?? {}
    const [page, setPage] = useState(1)

    const { data } = useQuery({
        queryFn: () => getFeedbackDoctorId(Number(id), { page: page }),
        queryKey: ["doctor", "feedback", `${id}-doctor-${page}-feedback-page`],
    })

    return (
        <div className={styles.wrapper}>
            {Array.isArray(data?.res?.results)
                ? data?.res?.results.map((item) => (
                      <Item key={`${item.id}_item_feed`} {...item} />
                  ))
                : null}
        </div>
    )
}
