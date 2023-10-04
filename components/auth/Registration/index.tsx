"use client"

import { Input } from "antd"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "next/navigation"

import type { TTypeMainScreen } from "../Main/components/types/types"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store/state"
import { registerUser, type IDataRegister } from "@/services/login"
import { checkExEmail, checkPasswordStrength } from "@/lib/regEx"

import styles from "./styles/style.module.scss"
import { ISetOfferOrTerms } from "../ModalTerms/types"

const Registration = ({
    setState,
    setIsVisibleType,
}: {
    setState: Dispatch<SetStateAction<TTypeMainScreen>>
    setIsVisibleType: Dispatch<SetStateAction<ISetOfferOrTerms>>
}) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const SearchParams = useSearchParams()
    const invited = SearchParams.get("invited-token")
    const { login } = useAuth()

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IValuesForm>({
        defaultValues: {
            type: "patient",
            isTerms: false,
        },
    })

    const onSubmit = handleSubmit(async (values: IValuesForm) => {
        if (loading) {
            return
        }
        setLoading(true)
        const data: IDataRegister = {
            email: values.email.toLowerCase(),
            password: values.password,
            password2: values?.password_!,
            is_doctor: values.type === "doctor",
            full_name: values.fullName,
            profile: {
                accept_politics: true,
                accept_public_offer: true,
            },
        }
        if (values.invited) {
            data.referral_code = values.invited!
        }
        registerUser(data).then((response) => {
            console.log("registerUser: ", response)
            if (response?.email) {
                if (login) {
                    login({
                        email: response?.email!,
                        password: values?.password,
                    })
                }
            }
            setLoading(false)
        })
    })

    useEffect(() => {
        if (invited) {
            setValue("invited", invited)
        }
    }, [invited])

    return (
        <div className={styles.wrapper}>
            <form className={styles.container} onSubmit={onSubmit}>
                <header>
                    <h3>{t("Registration")}</h3>
                    <div className={styles.typesProfile}>
                        <p
                            className={cx(watch("type") === "patient" && styles.active)}
                            onClick={(e) => {
                                e.preventDefault()
                                setValue("type", "patient")
                            }}
                        >
                            пациент
                        </p>
                        <p
                            className={cx(watch("type") === "doctor" && styles.active)}
                            onClick={(e) => {
                                e.preventDefault()
                                setValue("type", "doctor")
                            }}
                        >
                            доктор
                        </p>
                    </div>
                </header>
                <section>
                    <section>
                        <label>ФИО</label>
                        <input
                            type="text"
                            {...register("fullName", { required: true, minLength: 3 })}
                            placeholder={t("How to contact you (full name)")!}
                        />
                        {errors.fullName && <i>Обязательное поле!!!</i>}
                    </section>
                    <section>
                        <label>Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: (value) => checkExEmail(value),
                            })}
                            placeholder="example@mail.org"
                        />
                        {errors.email && <i>Без Email мы вас не зарегистрируем!</i>}
                    </section>
                    <section>
                        <label>{t("Password")}</label>
                        <Input.Password
                            value={watch("password")}
                            {...register("password", {
                                required: true,
                                minLength: 5,
                            })}
                            placeholder={t("Enter the password")!}
                            onChange={(value) => setValue("password", value.target.value!)}
                        />
                    </section>
                    <section>
                        <Input.Password
                            value={watch("password_")}
                            {...register("password_", {
                                required: true,
                                minLength: 5,
                            })}
                            placeholder={`${t("Enter the password")!} (повторно)`}
                            onChange={(value) => setValue("password_", value.target.value!)}
                        />
                        {errors.password_ || errors.password ? (
                            <i>Что-то не то с паролем</i>
                        ) : null}
                        {watch("password") !== watch("password_") && (
                            <i>Пароли не совпадает</i>
                        )}
                    </section>
                    <section>
                        <label>Код приглашения</label>
                        <input
                            type="text"
                            {...register("invited")}
                            placeholder={t("Your promo code (optional field)")}
                        />
                    </section>
                </section>
                <div className={styles.isTerms} {...register("isTerms", { required: true })}>
                    <section>
                        <div
                            className={styles.switch}
                            onClick={() => setValue("isTerms", !watch("isTerms"))}
                            data-switch={watch("isTerms")}
                        >
                            <div />
                        </div>
                        <p>
                            Потверждаю ознакомление и согласие с условиями{" "}
                            <span
                                onClick={() =>
                                    setIsVisibleType({ visible: true, type: "offer" })
                                }
                            >
                                Публичной оферты
                            </span>{" "}
                            и{" "}
                            <span
                                onClick={() =>
                                    setIsVisibleType({ visible: true, type: "terms" })
                                }
                            >
                                Условия использования
                            </span>{" "}
                            в полном объёме
                        </p>
                    </section>
                    {!watch("isTerms") && (
                        <i>Без потверждения и согласия мы вас не можем зарегистрировать</i>
                    )}
                </div>
                <footer>
                    <button
                        data-regular
                        onClick={() => {
                            setState("login")
                        }}
                    >
                        <span>{t("Enter")}</span>
                    </button>
                    <button type="submit" data-success data-loading={loading}>
                        <span>{t("Registration")}</span>
                    </button>
                </footer>
            </form>
        </div>
    )
}

export default Registration
interface IValuesForm {
    type: "patient" | "doctor"
    fullName: string
    email: string
    password: string
    password_: string
    invited?: string
    isTerms: boolean
}
