import { URL_API } from "./general-api"

const login = async (
    email: string,
    password: string
): Promise<{ res?: any; error?: boolean; errorData?: any }> => {
    try {
        const response = await fetch(`${URL_API}/login/`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
            method: "POST",
        })

        const data = await response.json()

        return {
            res: data,
        }
    } catch (e) {
        console.log("response error", e)
        return {
            error: true,
            errorData: e,
        }
    }
}

export { login }

export const refreshToken = async (refresh: string): Promise<any> => {
    try {
        const response = await fetch(`${URL_API}/token/refresh/`, {
            method: "POST",
            body: JSON.stringify({ refresh: refresh }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json()
    } catch (e) {
        console.error(e)
        return e
    }
}

export interface IDataRegister {
    email: string
    password: string
    password2: string
    is_doctor: boolean
    referral_code?: string
    full_name: string
    profile: {
        accept_politics: boolean
        accept_public_offer: boolean
    }
    // language_id?: number
}

export const registerUser = async (data: IDataRegister): Promise<any> => {
    // data.language_id = 1

    try {
        const response = await fetch(`${URL_API}/register/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        return response.json()
    } catch (e) {
        console.error(e)
        return e
    }
}
