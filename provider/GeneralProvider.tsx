import { type ReactNode } from "react"

import { Header } from "@/components/layout/Header"
import { Authorization } from "@/context/Authorization"
import { LoadDataPerson } from "@/context/LoadDataPerson"
import { ProviderWebSocket } from "@/context/useWebSocket"
import { MenuMobile } from "@/components/layout/MenuMobile"
import { ContextJanusVideoRoom } from "@/context/JanusContext"
import { ReactQueryProvider } from "@/context/ReactQueryProvider"
import { Feedback, IncomingCall, OutgoingCall } from "@/components/Janus"
import { AnimatedLoadPage } from "@/components/layout/AnimatedLoadPage"

interface IProps {
    children: ReactNode
}

export default function GeneralProvider({ children }: IProps) {
    return (
        <ReactQueryProvider>
            <Authorization>
                <ProviderWebSocket>
                    <ContextJanusVideoRoom>
                        <Header />
                        <LoadDataPerson>{children}</LoadDataPerson>
                        <MenuMobile />
                        <IncomingCall />
                        <Feedback />
                        <OutgoingCall />
                        <AnimatedLoadPage />
                    </ContextJanusVideoRoom>
                </ProviderWebSocket>
            </Authorization>
        </ReactQueryProvider>
    )
}
