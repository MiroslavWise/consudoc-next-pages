import dayjs from "dayjs"

import type { TGender, TStatusCall } from "@/types/general"
import type { IProfile } from "@/store/types/useProfile"

import { requestPOST_FORM, requestPUT, requestGET } from "./general-api"

export const getProfile = async () => {
    return requestGET<IProfile>("profile/")
}

export interface IValueDataProfile {
    phone?: string
    address?: string
    birthday?: any | Date | null //  2023-10-02
    gender?: TGender
}

export interface IValueDataUser {
    get_full_name?: string
    middle_name?: string
}

export const setUploadPhoto = async (data: any) => {
    return requestPOST_FORM("profile/update-photo/", data)
}

export const getDoctorRemark = async (page?: number) => {
    return requestGET<IRemark[]>("profile/doctor-remark/")
}

export const setUpdateProfile = async (data: IValueDataProfile) => {
    return requestPUT("profile/update-profile/", {
        phone: data.phone,
        address: data?.address,
        birthday: data?.birthday ? dayjs(data?.birthday).format("YYYY-MM-DD") : null,
        gender: data?.gender,
    })
}

export const setUpdateUser = async (data: IValueDataUser) => {
    return requestPUT("profile/update-user/", data)
}

export interface IRemark {
    conference: {
        conference_currency: {
            id: number
            name: string
        }
        conference_time: {
            id: number
            price: string
            sessions_time: string
        }
        created_at: Date | string
        doctor_specialization: any[]
        id: number
        specialization_name: string
        status: TStatusCall
        uuid: string
    }
    id: number
    patient: number
    profile_doctor: {
        avatar_url: string
        full_name: string
    }
    text: string
}
