"use client"

import { type ReactNode } from "react"

import type { AuthStateType } from "@/store/types/useAuthState"

import { Gates } from "@/components/auth/Gates"
import { Main } from "@/components/auth/Main"

import { useAuth } from "@/store/state"

export function Authorization({ children }: { children: ReactNode }) {
    const { state } = useAuth()

    const Routers: Record<AuthStateType, ReactNode> = {
        Gates: <Gates />,
        SignIn: <Main />,
        Main: children,
    }

    return Routers[state || "Gates"]
}
