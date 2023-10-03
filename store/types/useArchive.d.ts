import type { Dispatch, DispatchWithoutAction } from "react"
import type { TStatusCall } from "@/types/general"

interface IItemArchive {
    conference_currency: {
        id: number
        name: string
    }
    conference_time: {
        id: number
        price: string
        sessions_time: string
    }
    created_at: Date
    id: number
    price_service: string
    price_doctor: string
    record_url: string
    doctor: {
        accepts_at_current_time: any
        id: number
        profile: {
            email: string
            full_name: string
            id: number
            photo_url: string
        }
    }
    doctor_id: number
    status: TStatusCall
    patient_profile: {
        email: string
        full_name: string
        id: number
        photo_url: string
    }
    uuid: string
}

export interface IUseArchive {
    total: number | undefined
    page: number

    setTotal: Dispatch<number>
    setPage: Dispatch<number>
    resetArchive: DispatchWithoutAction
}
