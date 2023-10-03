import { type ReactNode } from "react"

import type { AuthStateType } from "@/store/types/useAuthState"

import { Main } from "@/components/auth/Main"
import { Gates } from "@/components/auth/Gates"
import { Header } from "@/components/layout/Header"
import { MenuMobile } from "@/components/layout/MenuMobile"

import { useAuth } from "@/store/state"

export function Authorization({ children }: { children: ReactNode }) {
    const { state } = useAuth()

    const Routers: Record<AuthStateType, ReactNode> = {
        Gates: <Gates />,
        SignIn: <Main />,
        Main: (
            <>
                <Header />
                <main>{children}</main>
                <MenuMobile />
            </>
        ),
    }

    return Routers[state || "Gates"]
}
