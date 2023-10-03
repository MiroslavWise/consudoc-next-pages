export type AuthStateType = "SignIn" | "Main" | "Gates"

export interface IReturnDataAuthToken {
    ok: boolean
    res?: any
    error?: any
}

interface ILogin {
    email: string
    password: string
}
export interface IAuthStorage {
    state?: AuthStateType
    token: string | undefined
    refreshToken: string | undefined
    expiration: number | undefined

    login?: (values: ILogin) => Promise<IReturnDataAuthToken>
    refresh?: () => Promise<IReturnDataAuthToken>
    out?: () => Promise<void>
}
