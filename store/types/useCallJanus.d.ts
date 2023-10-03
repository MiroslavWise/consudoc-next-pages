import { type DispatchWithoutAction, type Dispatch } from "react"

export interface IUseCallJanus {
    time: undefined | number
    currentTime: undefined | number
    setTime: DispatchWithoutAction
    deleteTime: DispatchWithoutAction
    getTimerCurrent: DispatchWithoutAction
}

export interface ICallInfo {
    conf_id: number
    sessions_time: string
    specialization: string
    uuid: string
}

export interface IDoctorInfo {
    avatar_url: string
    full_name: string
    profile_id: number
    doctor_id: number
}

export interface IUserInfo {
    avatar_url: string
    full_name: string
    profile_id: number
}

export interface IUsePropsCallingJanus {
    call_info: ICallInfo | undefined
    doctor_info: IDoctorInfo | undefined
    user_info: IUserInfo | undefined
    idRoom: number | undefined
    uuidRoom: string | undefined

    setUuidRoom: Dispatch<string | undefined>
    setIdRoom: Dispatch<number | undefined>
    setCallInfo: Dispatch<ICallInfo | undefined>
    setDoctorInfo: Dispatch<IDoctorInfo | undefined>
    setUserInfo: Dispatch<IUserInfo | undefined>
    deleteAll: DispatchWithoutAction
}
