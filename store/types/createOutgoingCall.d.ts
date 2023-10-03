import type { Dispatch, DispatchWithoutAction } from "react"

interface IInfoVisibleCall {
    visible: boolean
    name: string
    session: string
    avatar: string
    specialization: string
    profileIdDoctor: number
}

export interface IUseOutgoingCall {
    state: IInfoVisibleCall | undefined

    setState: ((value?: IInfoVisibleCall) => void) | (() => void)
}
