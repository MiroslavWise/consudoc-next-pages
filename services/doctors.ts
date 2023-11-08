import type { TStatus } from "@/store/types/useFilters"
import type { IItemArchive } from "@/store/types/useArchive"
import type { IDataReplaceSpec, IGetSpecializations } from "@/types/specializations"

import { requestGET, requestPUT, requestDELETE, requestPOST } from "./general-api"

export const getDoctors = async (params?: Record<string, string | number>) => {
    return requestGET(`doctors-filter/`, params)
}

export const getArchives = async (params?: Record<string, string | number>) => {
    return requestGET<{ count: number; results: IItemArchive[] }>(
        `profile/conference-archive/`,
        params
    )
}

export const getArchive = async (uuid: string) => {
    return requestGET<IItemArchive>(`conference/${uuid}/`)
}

export const switchStatus = async (status: TStatus) => {
    return requestPUT(`profile/update-status/`, { data: { status: status } })
}

export const getSpecializations = async () => {
    return requestGET<IGetSpecializations[]>(`doctor/spec/`)
}

export const deleteSpecialization = async (id: number | string) => {
    return requestDELETE(`doctor/spec/${id}/delete/`)
}

export const addSpecialization = async (data: IDataReplaceSpec) => {
    return requestPOST(`doctor/spec/add/`, data)
}

export const editSpecialization = async (id: string | number, data: IDataReplaceSpec) => {
    return requestPOST(`doctor/spec/${id}/edit/`, data)
}

export const getSpecializationsAllList = async (values?: Record<string, any>) => {
    return requestGET<any[]>("specialization/", values)
}
