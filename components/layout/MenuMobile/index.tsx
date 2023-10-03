"use client"

import { isMobile } from "react-device-detect"

import { ItemLink } from "./components/ItemLink"

import { useProfile } from "@/store/state"
import { LinksDoctor, LinksPatient } from "./constants"

import styles from "./styles/menu-mobile.module.scss"

export const MenuMobile = () => {
    const { isDoctor } = useProfile()
    return isMobile ? (
        <footer className={styles.container}>
            {isDoctor && LinksDoctor.map((item) => <ItemLink key={item.path} {...item} />)}
            {isDoctor === false &&
                LinksPatient.map((item) => <ItemLink key={item.path} {...item} />)}
        </footer>
    ) : null
}
