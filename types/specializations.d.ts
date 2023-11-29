import { IConsultationTime, IMiniProfile, ISpecializationMini } from "@/services/apiDoctors"

export interface IAttachments {
    file: string
    id: number
    name: string
}

export interface IGetSpecializations {
    additional_info: string
    attachments: IAttachments[]
    consultation_time: IConsultationTime[]
    degree: number
    id: number
    profile: IMiniProfile
    rating: number
    scientific_degree: boolean
    scientific_degree_text: string
    specialization: ISpecializationMini
    specialization_id: number
    university: string
    work_experience: number
    region_living: string
}

export interface IDataReplaceSpec {
    id?: number
    specialization_id: number
    university?: string
    scientific_degree?: boolean
    scientific_degree_text?: string
    work_experience: number
    category?: string
    additional_info?: string
    consultation_time: {
        sessions_time: string
        original_price: number
    }[]
}
