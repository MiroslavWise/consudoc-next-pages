import type { FC } from "react"

interface IItemLink {
    img: string
    label: string
    path: string
}

export type TItemLink = FC<IItemLink>
