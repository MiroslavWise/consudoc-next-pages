import { type ReactNode } from "react"

import { LeftSideBar } from "@/components/pages/profile"

import styles from "./layout.module.scss"

export const ProfileLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className={styles.wrapper}>
            <LeftSideBar />
            {children}
        </main>
    )
}
