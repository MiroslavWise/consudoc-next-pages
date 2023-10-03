import { IDoctorFilter } from "@/services/apiDoctors"
import type { FC } from "react"

export interface IItemDoctor extends IDoctorFilter {

}

export type TTypeMainScreen = "main" | "login" | "registration"

export type TItemDoctor = FC<IItemDoctor>
