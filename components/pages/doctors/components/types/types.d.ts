import type { IGetSpecializations } from "@/types/specializations"
import type { DispatchWithoutAction, FC } from "react"

interface IItemSpecialization extends IGetSpecializations {}

export interface IModalCall {
    fullName: string
    onCancelCall: DispatchWithoutAction
}

export type TItemSpecialization = FC<IItemSpecialization>
