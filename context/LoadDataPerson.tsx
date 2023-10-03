"use client"

import { type ReactNode, useEffect } from "react"

import { useAuth } from "@/store/state"
import { useProfile } from "@/store/state/useProfile"

export const LoadDataPerson = ({ children }: { children: ReactNode }) => {
    const { token } = useAuth()
    const { setProfile, reset } = useProfile((state) => ({
        setProfile: state.setProfile,
        reset: state.reset,
    }))

    useEffect(() => {
        if (token) setProfile()
        return () => reset()
    }, [token])

    return children
}
