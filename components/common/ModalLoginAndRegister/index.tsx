import { useMemo } from "react"
import Image from "next/image"

import { Glasses } from "../Glasses"
import { SignIn } from "./components/SignIn"
import { Register } from "./components/Register"

import { cx } from "@/lib/cx"
import { useVisibleSignIn } from "@/store/state"

import styles from "./style.module.scss"

export const ModalLoginAndRegister = () => {
    const state = useVisibleSignIn(({ state }) => state)
    const isVisibleModal = useVisibleSignIn(({ isVisibleModal }) => isVisibleModal)
    const isVisibleContent = useVisibleSignIn(({ isVisibleContent }) => isVisibleContent)
    const setDeactivateAnimation = useVisibleSignIn(
        ({ setDeactivateAnimation }) => setDeactivateAnimation
    )

    const content = useMemo(() => {
        const obj = {
            sign: <SignIn />,
            register: <Register />,
        }

        return obj[state]
    }, [state])

    return (
        <div className={cx(styles.wrapper, isVisibleModal && styles.visible)}>
            <div className={cx(styles.container, isVisibleContent && styles.visible)}>
                <ul>{content}</ul>
                <div className={cx(styles.close)} onClick={setDeactivateAnimation}>
                    <Image src="/svg/x-close.svg" alt="x-close" height={20} width={20} />
                </div>
                <Glasses />
            </div>
        </div>
    )
}
