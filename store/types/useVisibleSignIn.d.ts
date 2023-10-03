import type { DispatchWithoutAction, Dispatch } from "react"

export type TStateSignRegister = "sign" | "register"

export interface IUseVisibleSignIn {
    state: TStateSignRegister
    isVisibleModal: boolean
    isVisibleContent: boolean

    setState: Dispatch<TStateSignRegister>
    setActivateAnimation: DispatchWithoutAction
    setDeactivateAnimation: DispatchWithoutAction
}
