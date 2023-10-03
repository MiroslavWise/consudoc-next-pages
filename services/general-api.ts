import { ENV } from "@/config/variables"

export interface AuthResponse {
    access_token: string
    refresh_token: string
}

export const URL = ENV.url
export const URL_API = ENV.url_api
export const URL_SOCKET = (token: string) => `${process.env.NEXT_PUBLIC_WSS}/?token=${token}`

interface IReturnData<P> {
    ok: boolean
    res?: P
    error?: any
}

export const requestPOST = async (
    url: string,
    body: { [key: string]: any }
): Promise<IReturnData<any>> => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    if (JSON.parse(localStorage.getItem("auth")!)?.state?.token) {
        headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("auth")!)?.state?.token
        }`
    }
    try {
        const response = await fetch(`${URL_API}/${url}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        })

        const data = await response.json()

        if (data) {
            return {
                ok: true,
                res: data,
            }
        }
        return {
            ok: false,
            res: data,
        }
    } catch (e) {
        return {
            ok: false,
            error: e,
        }
    }
}

export const requestPOST_FORM = async (
    url: string,
    body: FormData
): Promise<IReturnData<any>> => {
    const headers: HeadersInit = {}
    if (JSON.parse(localStorage.getItem("auth")!)?.state?.token) {
        headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("auth")!)?.state?.token
        }`
    }
    try {
        const response = await fetch(`${URL_API}/${url}`, {
            method: "POST",
            headers: headers,
            body: body,
        })

        const data = await response.json()

        if (data) {
            return {
                ok: true,
                res: data,
            }
        }
        return {
            ok: false,
            res: data,
        }
    } catch (e) {
        return {
            ok: false,
            error: e,
        }
    }
}

export const requestPUT = async (
    url: string,
    body: { [key: string]: any }
): Promise<IReturnData<any>> => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    if (JSON.parse(localStorage.getItem("auth")!)?.state?.token) {
        headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("auth")!)?.state?.token
        }`
    }
    try {
        const response = await fetch(`${URL_API}/${url}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body),
        })

        const data = await response.json()

        if (data) {
            return {
                ok: true,
                res: data,
            }
        }
        return {
            ok: false,
            res: data,
        }
    } catch (e) {
        return {
            ok: false,
            error: e,
        }
    }
}

export async function requestGET<T>(
    url: string,
    params?: Record<string | number, string | number>
): Promise<IReturnData<T>> {
    let paramsString = params
        ? Object.entries(params)
              .map(([key, value]) => `&${key}=${value}`)
              .join("")
              .replace("&", "?")
        : ""
    const headers: HeadersInit = {}
    if (JSON.parse(localStorage.getItem("auth")!)?.state?.token) {
        headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("auth")!)?.state?.token
        }`
        headers["Content-Type"] = "application/json"
    }
    try {
        const response = await fetch(`${URL_API}/${url}${paramsString}`, {
            method: "GET",
            headers: headers,
        })

        const data: T = await response.json()

        if (data) {
            return {
                ok: true,
                res: data as T,
            }
        }

        return {
            ok: false,
            res: data,
        }
    } catch (e) {
        return {
            ok: false,
            error: e,
        }
    }
}

export const requestDELETE = async (url: string): Promise<IReturnData<any>> => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    if (JSON.parse(localStorage.getItem("auth")!)?.state?.token) {
        headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("auth")!)?.state?.token
        }`
    }
    try {
        const response = await fetch(`${URL_API}/${url}`, {
            method: "DELETE",
            headers: headers,
        })

        const data = await response.json()

        if (data) {
            return {
                ok: true,
                res: data,
            }
        }
        return {
            ok: false,
            res: data,
        }
    } catch (e) {
        return {
            ok: false,
            error: e,
        }
    }
}
