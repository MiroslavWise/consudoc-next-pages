"use client"

import { useEffect, useState } from "react"
import { isMobile } from "react-device-detect"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"

import type { ISetOfferOrTerms } from "../ModalTerms/types"
import type { TTypeMainScreen } from "./components/types/types"

import { Header } from "./components/Header"
import { FirstScreen } from "./components/FirstScreen"
import { TwoScreen } from "./components/TwoScreen"
import { MobileMain } from "./components/MobileMain"
import { DoctorScreen } from "./components/DoctorScreen"

const ModalTerms = dynamic(() => import("../ModalTerms"), { ssr: false })
const Registration = dynamic(() => import("../Registration"), { ssr: false })
const LoginScreen = dynamic(() => import("../LoginScreen"), { ssr: false })

import styles from "./style.module.scss"

export const Main = () => {
    const SearchParams = useSearchParams()
    const invited = SearchParams.get("invited-token")
    const [state, setState] = useState<TTypeMainScreen>("main")
    const [isVisibleType, setIsVisibleType] = useState<ISetOfferOrTerms>({
        visible: false,
        type: null,
    })

    useEffect(() => {
        if (invited) {
            setState("registration")
        }
    }, [invited])

    return (
        <div className={styles.wrapper}>
            {!isMobile ? <Header setState={setState} /> : null}
            {isMobile ? (
                state === "main" ? (
                    <MobileMain setState={setState} />
                ) : null
            ) : (
                <>
                    {state === "main" ? (
                        <>
                            <FirstScreen />
                            <TwoScreen />
                            <DoctorScreen />
                        </>
                    ) : null}
                </>
            )}
            {state === "registration" ? (
                <Registration setState={setState} setIsVisibleType={setIsVisibleType} />
            ) : null}
            {state === "login" ? <LoginScreen setState={setState} /> : null}
            <ModalTerms
                visible={isVisibleType.visible}
                type={isVisibleType.type}
                set={setIsVisibleType}
            />
        </div>
    )
}
