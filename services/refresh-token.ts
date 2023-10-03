import axios from "axios"

import { URL_API } from "./general-api"

const refreshTokenApi = async (refresh: string) => {
    return axios
        .post(
            `${URL_API}/token/refresh/`,
            {
                refresh: refresh,
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) => response?.data)
        .catch((e) => {
            console.error("ERROR REFRESH TOKEN: ", e)
        })
}

export default refreshTokenApi
