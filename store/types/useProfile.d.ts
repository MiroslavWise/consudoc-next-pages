import type { DispatchWithoutAction } from "react"
import { TStatus } from "./useFilters"

export type TGender = "male" | "female" | null
export interface IUser {
    date_joined: string | Date
    email: string
    email_verified: boolean
    id: number
    is_active: boolean
    is_admin: boolean
    is_doctor: boolean
    is_staff: boolean
    is_superuser: boolean
    telegramuser: any
    get_full_name: string
    middle_name: any
}

export interface IProf {
    address: string
    balance: {
        currency: {
            id: number
            name: string
        }
        current_balance: string
    }
    balance_referral_sum: {
        amount__sum: any
    }
    birthday: string | null
    currency: {
        id: number
        name: string
    }
    gender: TGender
    gender_display: string
    is_accountant: boolean
    is_can_use_ref_code: boolean
    phone: string
    photo: string
    profile_id: number
    referral_code: string | null
    status: TStatus
    user: IUser
}

export interface IProfile {
    profile: IProf
}

export interface IUseProfile {
    isDoctor: boolean | undefined
    isStaff: boolean | undefined
    loading: boolean | undefined
    profile: IProf | undefined
    user: IUser | undefined

    setProfile(): Promise<void>
    asyncUpdateStatus: DispatchWithoutAction
    reset: DispatchWithoutAction
}
