// import { axiosInstance, URL_API, URL } from './general-api'

// export const getApiCurrency = async () => {
//         return await axiosInstance.get(`/currency/`)
//                 .then(data => data?.data)
//                 .catch(e => console.error('ERROR CURRENCY: ', e))
// }

// interface IFirebaseDevices{
//         name: string
//         registration_id: string
//         device_id: string
//         type: 'android' | 'ios' | string
// }

// export const setFirebaseDevices = async ({ name, registration_id, device_id, type }: IFirebaseDevices): Promise<any> => {

//         return await axiosInstance.post(`${URL}/firebase/devices/`, {
//                 name,
//                 registration_id,
//                 device_id,
//                 active: true,
//                 type,
//         })
// }