import { BlockButtons } from "./BlockButtons"
import { Logo } from "@/components/layout/Header/components/Logo"

import styles from "./styles/header.module.scss"

export const Header = () => {
    return (
        <header className={styles.wrapper}>
            <Logo />
            <BlockButtons />
        </header>
    )
}
