import { create } from "zustand"
import * as jwt from "jsonwebtoken"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IAuthStorage } from "../types/useAuthState"

import { login, refreshToken } from "@/services/login"

export const useAuth = create(
    persist<IAuthStorage>(
        (set, get) => ({
            state: "Gates",
            token: undefined,
            refreshToken: undefined,
            expiration: undefined,

            async login({ email, password }) {
                const { res, error, errorData } = await login(email, password)
                if (error) {
                    console.error({ errorData })
                    return {
                        ok: false,
                        res: res,
                        error: error,
                    }
                }
                if (res) {
                    if (res?.details) {
                        return { ok: false }
                    }
                    const { access, refresh } = res ?? {}
                    const expiration = decodeJwt(access)
                    if (access && refresh) {
                        set({
                            token: access,
                            refreshToken: refresh,
                            expiration: expiration,
                            state: "Main",
                        })
                        return { ok: true, res: res }
                    }
                    set({
                        token: undefined,
                        refreshToken: undefined,
                        expiration: undefined,
                        state: "SignIn",
                    })
                    return { ok: false, error: error, res: res }
                }
                set({
                    token: undefined,
                    refreshToken: undefined,
                    expiration: undefined,
                    state: "SignIn",
                })
                return { ok: false, error: error, res: res }
            },
            async refresh() {
                try {
                    if (
                        !isTokenExpired(get().expiration) &&
                        typeof get().expiration === "number"
                    ) {
                        set({ state: "Main" })
                        return { ok: true }
                    }
                    if (typeof get().refreshToken !== "string") {
                        set({
                            token: undefined,
                            refreshToken: undefined,
                            expiration: undefined,
                            state: "SignIn",
                        })
                        return { ok: false }
                    }
                    if (
                        typeof get().expiration === "number" &&
                        isTokenExpired(get().expiration) &&
                        typeof get().refreshToken === "string"
                    ) {
                        const response = await refreshToken(get().refreshToken!)
                        const { access } = response ?? {}
                        const expiration = decodeJwt(access)
                        if (access) {
                            set({
                                state: "Main",
                                token: access,
                                expiration: expiration,
                            })
                            return { ok: true }
                        }
                        set({
                            token: undefined,
                            refreshToken: undefined,
                            expiration: undefined,
                            state: "SignIn",
                        })
                        return { ok: false }
                    }
                    set({
                        token: undefined,
                        refreshToken: undefined,
                        expiration: undefined,
                        state: "SignIn",
                    })
                    return { ok: false }
                } catch (e) {
                    console.warn("---ERROR UPDATE REFRESH TOKEN OR TOKEN--- ", e)
                    set({
                        token: undefined,
                        refreshToken: undefined,
                        expiration: undefined,
                        state: "SignIn",
                    })
                    return { ok: false }
                }
            },
            async out() {
                return await Promise.resolve(
                    set({
                        token: undefined,
                        refreshToken: undefined,
                        expiration: undefined,
                        state: "SignIn",
                    })
                )
            },
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
            partialize(state) {
                return {
                    token: state.token,
                    refreshToken: state.refreshToken,
                    expiration: state.expiration,
                }
            },
        }
    )
)

function decodeJwt(token: string): number | undefined {
    try {
        const decodedPayload: any = jwt.decode(token, { complete: true })
        const expirationTime: number | undefined = decodedPayload?.payload?.exp

        if (expirationTime !== undefined) {
            return expirationTime
        }
    } catch (error) {
        console.error("Error decoding JWT:", error)
        return undefined
    }

    return undefined
}

function isTokenExpired(exp: number | undefined) {
    if (exp !== undefined) {
        const currentTime: number = Math.floor(Date.now() / 1000)
        return exp < currentTime
    }
}
