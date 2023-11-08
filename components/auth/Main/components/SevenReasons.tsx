import { useEffect, useMemo, useState } from "react"
import { ITEMS_SEVEN } from "./constants"
import styles from "./styles/seven-reasons.module.scss"

export const SevenReasons = () => {
    const [num, setNum] = useState(0)

    useEffect(() => {
        setInterval(() => {
            setNum((prev) => {
                if (prev === 6) {
                    return 0
                } else {
                    return prev + 1
                }
            })
        }, 3500)
    }, [])

    const item = useMemo(() => {
        return ITEMS_SEVEN.find((_, index) => num === index)!
    }, [num])

    return (
        <div className={styles.wrapper}>
            <header>
                <h2>Семь причин обратиться в ConsuDoc</h2>
            </header>
            <section>
                <div key={`${item.title}-it`} data-item>
                    <h4>
                        {num + 1}. {item.title}
                    </h4>
                    <p>{item.sub}</p>
                </div>
            </section>
        </div>
    )
}
