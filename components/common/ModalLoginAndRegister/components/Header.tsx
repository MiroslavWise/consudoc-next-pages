import Image from "next/image"

import type { TStateSignRegister } from "@/store/types/useVisibleSignIn"

import { useVisibleSignIn } from "@/store/state"

import styles from "./styles/header.module.scss"

export const Header = () => {
    const { state } = useVisibleSignIn()

    const h2: Record<TStateSignRegister, string> = {
        sign: "Войдите в свой аккаунт",
        register: "Создать аккаунт",
    }
    const p: Record<TStateSignRegister, string> = {
        sign: "С возвращением! Пожалуйста, введите свои данные ниже.",
        register: "Зарегистрируйтесь в Consudoc и размещайте свои предложения на карте",
    }

    return (
        <header className={styles.header}>
            <Image src="/svg/logo.svg" alt="logo" height={50} width={232} />
            <div className={styles.block}>
                <h2>{h2[state]}</h2>
                <p>{p[state]}</p>
            </div>
        </header>
    )
}
