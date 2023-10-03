import type { FC } from "react"
import type { IGetSpecializations } from "@/types/specializations"

export interface IItemSpecialization extends IGetSpecializations {
    refetch: () => Promise<any>
}

export type TItemSpecialization = FC<IItemSpecialization>

interface ILabelInput {
    label: string
    children: ReactNode
}

export type TLabelInput = FC<ILabelInput>
