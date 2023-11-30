"use client"

import { useEffect, useState } from "react"
import { isMobile } from "react-device-detect"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"

import type { ISetOfferOrTerms } from "../ModalTerms/types"

import { Header } from "./components/Header"
import { FirstScreen } from "./components/FirstScreen"
import { TwoScreen } from "./components/TwoScreen"
import { Footer } from "@/components/layout/Footer"
import { DoctorScreen } from "./components/DoctorScreen"
import { SevenReasons } from "./components/SevenReasons"
import { AboutAs } from "@/components/pages/information/AboutAs"
import { Contacts } from "@/components/pages/information/Contacts"
import { Customers } from "@/components/pages/information/Сustomers"
import { SecurityOfOnlinePayments } from "@/components/pages/information/SecurityOfOnlinePayments"
import { RulesForUsingTheResource } from "@/components/pages/information/RulesForUsingTheResource"

const ModalTerms = dynamic(() => import("../ModalTerms"), { ssr: false })
const Registration = dynamic(() => import("../Registration"), { ssr: false })
const LoginScreen = dynamic(() => import("../LoginScreen"), { ssr: false })
const MobileMain = dynamic(() => import("./components/MobileMain"), { ssr: false })

import { usePush } from "@/hooks/usePath"

import styles from "./style.module.scss"

export const Main = () => {
    const searchParams = useSearchParams()
    const { handleReplace } = usePush()
    const invited = searchParams.get("invited-token")
    const stateParams = searchParams.get("state")
    const pages = searchParams.get("information")
    const [isVisibleType, setIsVisibleType] = useState<ISetOfferOrTerms>({
        visible: false,
        type: null,
    })

    useEffect(() => {
        if (invited) {
            handleReplace("?state=registration")
        }
    }, [invited])

    return (
        <div className={styles.wrapper}>
            {!isMobile ? <Header /> : null}
            {stateParams === "login" ? (
                <LoginScreen />
            ) : stateParams === "registration" ? (
                <Registration setIsVisibleType={setIsVisibleType} />
            ) : isMobile ? (
                <MobileMain />
            ) : (
                <>
                    {pages === "about-as" ? (
                        <AboutAs />
                    ) : pages === "contacts" ? (
                        <Contacts />
                    ) : pages === "security-of-online-payments" ? (
                        <SecurityOfOnlinePayments />
                    ) : pages === "customers" ? (
                        <Customers />
                    ) : pages === "rules-for-using-the-resource" ? (
                        <RulesForUsingTheResource />
                    ) : (
                        <>
                            <FirstScreen />
                            <TwoScreen />
                            <DoctorScreen />
                            <SevenReasons />
                        </>
                    )}
                </>
            )}
            <ModalTerms visible={isVisibleType.visible} type={isVisibleType.type} set={setIsVisibleType} />
            {!isMobile && <Footer />}
        </div>
    )
}
