import axios, { AxiosResponse } from 'axios'
// import { axiosInstance } from './general-api'

type TStatus = "offline" | "online" | "busy"

export const getStatus = async (status: TStatus ) => {
        try {
                // const response: AxiosResponse = await axiosInstance.put('/profile/update-status/', { data: { status: status } })
                
                // const data = response?.data

                // return data
        } catch (e) {
                console.error('ERROR TStatus DATA: ', e)
        }
}