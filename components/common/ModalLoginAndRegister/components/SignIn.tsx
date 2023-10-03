"use client"

import { useForm } from "react-hook-form"

import type { TSignRegister, IValuesSubmitLogin } from "./types"

import { Header } from "./Header"
import { Footer } from "./Footer"

import { useAuth, useVisibleSignIn } from "@/store/state"

import styles from "./styles/sign.module.scss"
import styleInput from "./styles/style.module.scss"
import { regExEmail } from "@/lib/regEx"

export const SignIn: TSignRegister = ({}) => {
    const { setState } = useVisibleSignIn()
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IValuesSubmitLogin>()

    function handleLogin(values: IValuesSubmitLogin) {
        if (login) {
            login({ email: values.email, password: values.password })
        }
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit(handleLogin)}>
            <Header />
            <section>
                <div className={styleInput.blockInput}>
                    <label>
                        Email <sup>*</sup>
                    </label>
                    <input
                        placeholder="Введите свой Email"
                        type="text"
                        {...register("email", {
                            required: true,
                            validate: (value) => regExEmail.test(value),
                        })}
                    />
                </div>
                <div className={styleInput.blockInput}>
                    <label>
                        Пароль <sup>*</sup>
                    </label>
                    <input
                        placeholder="Введите свой пароль"
                        type="password"
                        {...register("password", { required: true })}
                    />
                </div>
                <button className={styleInput.buttonEnter} type="submit">
                    <span>Войти</span>
                </button>
            </section>
            <Footer />
        </form>
    )
}
