import type { AppProps } from "next/app"
import { Inter } from "next/font/google"

import GeneralProvider from "@/provider/GeneralProvider"

import { cx } from "@/lib/cx"

import "@/styles/init.scss"
import "react-toastify/dist/ReactToastify.css"
import "@/context/i18n"
import Head from "next/head"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Consudoc</title>
                <meta name="description" content="Медецинское консультирование" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, user-scalable=no, maximum-scale=1"
                />
            </Head>
            <div className={cx(inter.className, "main-div")}>
                <GeneralProvider>
                    <Component {...pageProps} />
                    {/* <Footer /> */}
                </GeneralProvider>
            </div>
        </>
    )
}
