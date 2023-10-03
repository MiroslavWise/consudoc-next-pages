import { DispatchWithoutAction } from "react"

export interface IUseAnimatedPreload {
    isAnimated: boolean
    activated: DispatchWithoutAction
    deactivated: DispatchWithoutAction
}
