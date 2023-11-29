import { useEffect, type ReactNode } from "react"

import { ModalReferral } from "@/templates"
import { Authorization } from "@/context/Authorization"
import { LoadDataPerson } from "@/context/LoadDataPerson"
import { ProviderWebSocket } from "@/context/useWebSocket"
import { ContextJanusVideoRoom } from "@/context/JanusContext"
import { ReactQueryProvider } from "@/context/ReactQueryProvider"
import { Feedback, IncomingCall, OutgoingCall } from "@/components/Janus"
import { AnimatedLoadPage } from "@/components/layout/AnimatedLoadPage"

interface IProps {
    children: ReactNode
}

export default function GeneralProvider({ children }: IProps) {
    useEffect(() => {
        window.addEventListener("load", () => {
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker.register("/service-worker.js").then((response) => {
                    console.log("serviceWorker: ", response.scope)
                })
            }
        })
    }, [])

    return (
        <ReactQueryProvider>
            <Authorization>
                <ProviderWebSocket>
                    <ContextJanusVideoRoom>
                        <LoadDataPerson>{children}</LoadDataPerson>
                        <IncomingCall />
                        <Feedback />
                        <OutgoingCall />
                        <AnimatedLoadPage />
                        <ModalReferral />
                    </ContextJanusVideoRoom>
                </ProviderWebSocket>
            </Authorization>
        </ReactQueryProvider>
    )
}
