// import { axiosInstance } from './general-api'

// export const notifications = (page: number) => {
//         return axiosInstance
//                 .get(`/notifications?page=${page}`)
//                 .then(data => data.data)
//         .catch(e => {throw e})
// }

// export const read_notification = (id: number | string) => {
//         return axiosInstance
//                 .post(`/notifications/read`, {
//                 id
//         })
//         .then(data => data)
//         .catch(e => {throw e})
// }