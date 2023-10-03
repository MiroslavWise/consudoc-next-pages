import { requestGET, requestPOST } from "./general-api"

interface IValuesResponseConfInfo {
    status: "CALL_ONLINE"
    id: number
    uuid: number
}

export const apiToConfInfo = async (value: string) => {
    return requestGET<IValuesResponseConfInfo>(`conference/${value}/`)
}

export const apiToDoctorFeedback = async (data: Record<string, any>) => {
    return requestPOST(`doctor/feedback/add/`, data)
}

export const setDoctorFeedback = async (data: Readonly<Record<string, any>>) => {
    return requestPOST(`doctor/feedback/add/`, data)
}

export const setDoctorReviewToPatient = async (data: Readonly<Record<string, any>>) => {
    return requestPOST(`doctor/remark/add/`, data)
}
