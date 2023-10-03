import type { FC, Dispatch, SetStateAction } from "react"

export interface ISignRegister {
}

export type TSignRegister = FC<ISignRegister>

export interface IValuesSubmitLogin{
    email: string
    password: string
}