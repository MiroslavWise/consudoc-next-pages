"use client"

import Image from "next/image"
import {
    isAndroid,
    isIOS,
    isIOS13,
    isIPhone13,
    isIPod13,
    isIPad13,
    isSamsungBrowser,
} from "react-device-detect"
import { useTranslation } from "react-i18next"

import { type Dispatch, type SetStateAction } from "react"
import type { TTypeMainScreen } from "./types/types"

import styles from "./styles/mobile-main.module.scss"

const MobileMain = ({ setState }: { setState: Dispatch<SetStateAction<TTypeMainScreen>> }) => {
    const { t } = useTranslation()

    const isAppleStore = isIOS || isIOS13 || isIPhone13 || isIPod13 || isIPad13
    const isPlayMarket = isAndroid || isSamsungBrowser

    function handleOnAppleStore() {
        if (!isAppleStore) {
            return
        }
        const url = process.env.NEXT_PUBLIC_URL_APPLE_STORE
        window.open(url, "_blank")
    }
    function handleOnPlayMarket() {
        if (!isPlayMarket) {
            return
        }
        const url = process.env.NEXT_PUBLIC_URL_PLAY_MARKET
        window.open(url, "_blank")
    }

    return (
        <main className={styles.wrapper}>
            <section>
                <Image
                    src="/svg/logo-full.svg"
                    alt="main-logo"
                    width={244}
                    height={50}
                    className={styles.logo}
                    unoptimized
                />
                <h2>Самый быстрый способ проконсультироваться с врачом</h2>
                <section>
                    <Image
                        onClick={handleOnAppleStore}
                        src="/market/apple-s.svg"
                        alt="apple-s"
                        data-apple
                        data-gray={!isAppleStore}
                        width={178}
                        height={56}
                        unoptimized
                    />
                    <Image
                        onClick={handleOnPlayMarket}
                        src="/market/play-m.svg"
                        alt="play-m"
                        data-play
                        data-gray={!isPlayMarket}
                        width={177}
                        height={56}
                        unoptimized
                    />
                </section>
            </section>
            <footer>
                <button data-regular onClick={() => setState("login")}>
                    <span>{t("Enter")}</span>
                </button>
                <button data-fill onClick={() => setState("registration")}>
                    <span>{t("Зарегистрироваться")}</span>
                </button>
            </footer>
        </main>
    )
}

export default MobileMain
