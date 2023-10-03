import { TStatus } from "@/store/types/useFilters"
import { requestGET } from "./general-api"
import { IGetSpecializations } from "@/types/specializations"

export async function getDoctors(values?: { [key: string]: any }) {
    return requestGET<IDoctorFilters>(`doctors-filter/`, values)
}

export async function getDoctorId(id: number) {
    return requestGET<IDoctorProfile>(`doctor/${id}/`)
}

export async function getFeedbackDoctorId(id: number, value?: Record<string, any>) {
    return requestGET<IFeedback>(`doctor/${id}/feedback/`, value)
}

export interface ISpecialization {}
export interface IDoctorProfile {
    accepts_at_current_time: any
    additional_info: any
    additional_info_files: any
    get_all_specialization: IGetSpecializations[]
    profile: IMiniProfile
    service_issues: any
    verified: boolean
}

export interface IItemFeedback {
    author: {
        avatar_url: string
        full_name: string
    }
    created_at: Date
    id: number
    rating: number
    doctor: number
    text: string
}

export interface IFeedback {
    count: number
    results: IItemFeedback[]
}

export interface IDoctorFilters {
    count: number
    results: IDoctorFilter[]
}

export interface IConsultationTime {
    id: number
    price: string
    sessions_time: string
    original_price: string
}

export interface IMiniProfile {
    avatar_url: string
    photo_url?: string
    full_name: string
    id: number
    status: TStatus
    verified: boolean
    user?: number
    profile_id?: number
}

export interface ISpecializationMini {
    consult_issues: string
    description: string
    id: number
    name: string
}

export interface IDoctorFilter {
    consultation_time: IConsultationTime[]
    id: number
    profile: IMiniProfile
    doctor_id: number
    spec_rating: string
    specialization: ISpecializationMini
    specialization_id: number
}
