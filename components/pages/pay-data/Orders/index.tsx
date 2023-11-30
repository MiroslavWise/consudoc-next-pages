import dayjs from "dayjs"
import { useMemo, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { apiOrderList } from "@/services/api-order"
import { SVG, TYPES_TRANSACTIONS } from "./constants"

import styles from "./style.module.scss"

export const Orders = () => {
    const [page, setPage] = useState(1)

    const { data } = useQuery({
        queryFn: () => apiOrderList(page),
        queryKey: ["order", "list", `page=${page}`],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const list = useMemo(() => {
        return data?.res?.results || []
    }, [data?.res])

    return (
        <div className={styles.wrapper}>
            <div>
                <article>
                    {TYPES_TRANSACTIONS.map((item) => (
                        <div data-item key={`${item.img}:${item.label.replace(" ", "-")}`}>
                            <div data-img>
                                <img src={item.img} alt={item.img} width={24} height={24} />
                            </div>
                            <p>{item.label}</p>
                        </div>
                    ))}
                </article>
                {list.length ? (
                    <ul>
                        {list.map((item) => (
                            <li key={`${item.id}-amount`}>
                                <div data-icon>
                                    <img src={SVG[item.status!]} alt="amount" width={24} height={24} />
                                </div>
                                <div data-info>
                                    <h4>
                                        Сумма: <span>{Number(item.amount).toFixed(0)}₸</span>
                                    </h4>
                                    {item.updated_at ? (
                                        <h4>
                                            Дата и время: <span>{dayjs(item.updated_at).format("HH:mm DD.MM.YYYY")}</span>
                                        </h4>
                                    ) : null}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul>
                        <p>У вас не было никаких транзакций</p>
                    </ul>
                )}
            </div>
        </div>
    )
}
