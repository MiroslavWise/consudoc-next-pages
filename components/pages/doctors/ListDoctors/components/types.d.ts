import type { FC } from "react"
import type { IDataDoctor } from "@/store/types/useFilters"

export interface IItem extends IDataDoctor {
    isLoading: boolean
}

export type TItem = FC<IItem>
