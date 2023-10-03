"use client"

import { type Dispatch, type SetStateAction } from "react"

import type { TTypeMainScreen } from "./types/types"

import { useVisibleSignIn } from "@/store/state"

import styles from "./styles/block-buttons.module.scss"

export const BlockButtons = ({
    setState,
}: {
    setState: Dispatch<SetStateAction<TTypeMainScreen>>
}) => {
    // const { setActivateAnimation, setState } = useVisibleSignIn()

    // function handleEnter() {
    //     setState("sign")
    //     setActivateAnimation()
    // }

    // function handleRegister() {
    //     setState("register")
    //     setActivateAnimation()
    // }

    return (
        <div className={styles.container}>
            <a>Русский</a>
            <p onClick={() => setState("login")}>Вход</p>
            <div className={styles.buttonRegister} onClick={() => setState("registration")}>
                <p>Присоединиться</p>
            </div>
        </div>
    )
}
