import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store/state"
import { getProfile } from "@/services/profile"

import styles from "./styles/replenishment.module.scss"
import { useSearchParams } from "next/navigation"
import { apiCreateOrder } from "@/services/api-order"

const RADIOS: IRadios[] = [
    {
        label: "1 000",
        value: "1000",
    },
    {
        label: "5 000",
        value: "5000",
    },
    {
        label: "10 000",
        value: "10000",
    },
    {
        label: "свыше 10 000",
        value: "10000+",
    },
]

export const Replenishment = () => {
    const amountMin = useSearchParams().get("amount-min")
    const token = useAuth(({ token }) => token)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, setValue, watch } = useForm<IValues>({
        defaultValues: {
            radio: "1000",
            input: 10_001,
        },
    })

    const { data, isLoading } = useQuery({
        queryFn: () => getProfile(),
        queryKey: ["profile", token],
        enabled: !!token,
        refetchOnReconnect: true,
    })

    useEffect(() => {
        console.log("amountMin:", amountMin)
        if (!!amountMin) {
            if (Number(amountMin) > 0 && Number(amountMin) <= 1000) {
                setValue("radio", "1000")
            } else if (Number(amountMin) > 1000 && Number(amountMin) <= 5000) {
                setValue("radio", "5000")
            } else if (Number(amountMin) > 5000 && Number(amountMin) <= 10000) {
                setValue("radio", "10000")
            } else if (Number(amountMin) > 10000) {
                setValue("radio", "10000+")
                setValue("input", Number(amountMin))
            }
        }
    }, [amountMin])

    const onSubmit = handleSubmit(function onInMoney(values: IValues) {
        if (!loading) {
            setLoading(true)
            if (values?.radio) {
                let amount = +values?.radio

                if (values?.radio === "10000+") {
                    if (Number(values.input) <= 10_000) {
                        amount = 10_0010
                    } else {
                        amount = Number(values.input) || 10_000
                    }
                }

                apiCreateOrder({ amount: amount })
                    .then((response) => {
                        if (response?.res && response?.ok) {
                            console.log("values: ", response)
                            document.location.href = response?.res?.payment_order_url!
                        }
                    })
                    .catch((error) => {
                        console.log("error:", error)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        }
    })

    const amount = useMemo(() => {
        if (watch("radio") === "10000+") {
            return Number(watch("input")) || 10_000
        } else if (watch("radio")) {
            return Number(watch("radio"))
        } else {
            return 0
        }
    }, [watch("radio"), watch("input")])

    const balance = useMemo(() => {
        return Number(data?.res?.profile?.balance?.current_balance) || 0
    }, [data?.res])

    if (isLoading) return null

    return (
        <div className={styles.wrapper}>
            <section>
                <h3>Ваш текущий баланс</h3>
                <p>
                    Баланс: <span>{balance}₸</span>
                </p>
            </section>
            <form onSubmit={onSubmit}>
                <h3>Пополнить баланс</h3>
                <h4>Выберите сумму для пополнения баланса: </h4>
                <div data-grid>
                    {RADIOS.map((item) => (
                        <div
                            key={`${item.value}-v-----`}
                            data-item-grid
                            {...register("radio", { required: true })}
                            onClick={() => {
                                setValue("radio", item.value)
                            }}
                            data-is={item.value === watch("radio")}
                        >
                            <div data-radio>
                                <div />
                            </div>
                            <span>{item.label}</span>
                        </div>
                    ))}
                    <div data-input={watch("radio") === "10000+"}>
                        <h4>Введите сумму:</h4>
                        <input
                            type="number"
                            {...register("input", { required: false, min: 10_000 })}
                        />
                    </div>
                </div>
                <footer>
                    <button type="submit" disabled={loading}>
                        <span>Пополнить на {amount}₸</span>
                    </button>
                </footer>
            </form>
        </div>
    )
}

interface IRadios {
    label: string
    value: TRadio
}

type TRadio = "1000" | "5000" | "10000" | "10000+"

interface IValues {
    incom: number
    radio: TRadio
    input?: number | string
}
