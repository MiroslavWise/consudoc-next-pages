import type { AppProps } from "next/app"
import { Inter } from "next/font/google"

import GeneralProvider from "@/provider/GeneralProvider"

import "@/styles/init.scss"
import "react-toastify/dist/ReactToastify.css"
import "@/context/i18n"

const inter = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={inter.className} style={{ height: "100vh" }}>
            <GeneralProvider>
                <Component {...pageProps} />
            </GeneralProvider>
            <span className="glass-circle-1" />
            <span className="glass-circle-2" />
            <span className="glass-circle-3" />
            <span className="glass-circle-4" />
        </main>
    )
}
