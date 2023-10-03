"use state"

import { type Dispatch, type SetStateAction } from "react"

import type { TTypeMainScreen } from "./types/types"

import { BlockButtons } from "./BlockButtons"
import { Logo } from "@/components/layout/Header/components/Logo"

import styles from "./styles/header.module.scss"

export const Header = ({
    setState,
}: {
    setState: Dispatch<SetStateAction<TTypeMainScreen>>
}) => {
    return (
        <header className={styles.wrapper}>
            <Logo setState={setState} />
            <BlockButtons setState={setState} />
        </header>
    )
}
