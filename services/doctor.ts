import axios, { AxiosResponse } from "axios"
import { URL_API } from "./general-api"

export const getDoctorCurrent = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.get(`${URL_API}/doctor/${id || ""}`, {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("auth")!)?.state?.token
                }`,
            },
        })

        const data = response?.data

        return data
    } catch (e) {
        console.error("ERROR PROFILE DATA: ", e)
    }
}
