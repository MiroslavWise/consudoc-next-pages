import type { FC, Dispatch, SetStateAction } from "react"

export type TOfferOrTerms = "offer" | "terms"

export interface ISetOfferOrTerms {
    type: TOfferOrTerms | null
    visible: boolean
}

export interface IModalTerms {
    visible: boolean
    type: TOfferOrTerms | null

    set: Dispatch<SetStateAction<ISetOfferOrTerms>>
}

export type TModalTerms = FC<IModalTerms>
