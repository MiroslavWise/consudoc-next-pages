import type { FC } from "react"
import type { IItemFeedback } from "@/services/apiDoctors"

interface IItem extends IItemFeedback {}

export type TItem = FC<IItem>
