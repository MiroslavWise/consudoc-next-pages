"use client"

import { Input } from "antd/lib"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { isMobile } from "react-device-detect"
import { useState, type Dispatch, type SetStateAction } from "react"

import type { TTypeMainScreen } from "../Main/components/types/types"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store/state"

import styles from "./styles/style.module.scss"

interface IValuesForm {
    email: string
    password: string
}

const LoginScreen = ({
    setState,
}: {
    setState: Dispatch<SetStateAction<TTypeMainScreen>>
}) => {
    const { t } = useTranslation()
    const login = useAuth(({ login }) => login)
    const [loading, setLoading] = useState(false)
    const {
        register,
        setValue,
        setError,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IValuesForm>()

    const onSubmit = handleSubmit(async (values: IValuesForm) => {
        if (!loading) {
            setLoading(true)
            console.log("values: ", values)
            if (login) {
                login({ email: values.email, password: values.password }).then((response) => {
                    if (!response?.ok) {
                        console.log("res: ", response?.res)
                        const detail = response?.res?.detail
                        console.log("detail: ", detail)
                        setError("email", { message: detail }, { shouldFocus: true })
                    }
                    setLoading(false)
                })
            }
        }
    })

    return (
        <div className={cx(styles.wrapper, isMobile && styles.mobile)}>
            <div className={styles.container}>
                <header>
                    <h3>Вход в аккаунт</h3>
                </header>
                <section>
                    <form onSubmit={onSubmit}>
                        <div className={styles.labelAndInput}>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder={t("Please enter your E-mail")}
                                {...register("email", { required: true })}
                            />
                            {errors.email ? <i>{errors?.email?.message}</i> : null}
                        </div>
                        <div className={styles.labelAndInput}>
                            <label>{t("Password")}</label>
                            <Input.Password
                                value={watch("password")}
                                {...register("password", {
                                    required: true,
                                })}
                                placeholder={`${t("Enter the password")!}`}
                                onChange={(value) => setValue("password", value.target.value!)}
                            />
                        </div>
                        <div className={styles.rememberAndForget}></div>
                        <button
                            type="submit"
                            className={styles.buttonEnter}
                            data-loading={loading}
                        >
                            <span>{t("Enter")}</span>
                        </button>
                        <footer>
                            <p>{t("No account")}?</p>
                            <a onClick={() => setState("registration")}>Зарегистрируйтесь</a>
                        </footer>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default LoginScreen
