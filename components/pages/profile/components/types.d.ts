import type { FC } from "react"

interface ILabelInfo {
    label: string
    text: string | null
}

export type TLabelInfo = FC<ILabelInfo>
