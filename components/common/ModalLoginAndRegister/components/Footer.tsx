import { type ReactNode } from "react"

import type { TStateSignRegister } from "@/store/types/useVisibleSignIn"

import { useVisibleSignIn } from "@/store/state"

import styles from "./styles/footer.module.scss"
import Image from "next/image"

export const Footer = () => {
    const { state, setState } = useVisibleSignIn()

    const p: Record<TStateSignRegister, ReactNode> = {
        sign: <p onClick={() => setState("sign")}>Нет аккаунта?</p>,
        register: (
            <Image
                src="/svg/arrow-left.svg"
                alt="arrow-left"
                height={20}
                width={20}
                onClick={() => setState("sign")}
            />
        ),
    }

    const a: Record<TStateSignRegister, ReactNode> = {
        sign: <a onClick={() => setState("register")}>Зарегистрироваться</a>,
        register: <a onClick={() => setState("sign")}>Назад к странице входа</a>,
    }

    return (
        <footer className={styles.footer}>
            {p[state]}
            {a[state]}
        </footer>
    )
}
