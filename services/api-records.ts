// import { axiosInstance, URL_API } from './general-api'

// export const api_recording_create = (doctor_id: number | string) => {

//         return axiosInstance
//                 .post(`${URL_API}/notes/create`,
//                         {
//                                 doctor_id
//                         }
//                 )
//                 .then((response) => response.data)
//                 .catch(e => { throw e })
// }

// export const api_recording_delete = (id:number) => {
//         return axiosInstance
//                 .delete(`${URL_API}/notes/delete?id=${id}`)
//                 .then(data => data.data)
//                 .catch((e:any) => {throw e})
// }

// export const api_recording_update = ({ id, problem, specialization, attachments_comment = '', datetime, conference_time }: {
//         id: number | string
//         problem: string
//         specialization: string | number
//         attachments_comment?: string
//         datetime: string
//         conference_time: string
// }) => {
//         return axiosInstance.post(
//                 `${URL_API}/notes/update`,
//                 {
//                                 id,
//                                 status: "REQUESTED",
//                                 problem,
//                                 specialization,
//                                 // attachments_comment,
//                                 datetime,
//                                 conference_time
//                 }
//         )
// }

// export const api_recording_upload = (note_id: number, file: any) => {
//         return axiosInstance
//                 .post(`${URL_API}/notes/attachment/add`, {
//                         file,
//                         note_id
//                 })
//                 .then((data) => {
//                         console.log('upload attachment: ', data)
//                 })
//                 .catch((e) => {
//                         throw e
//                 })
// }

// export const get_recording = (date="") => {
//         return axiosInstance
//                 .get(`${URL_API}/notes?date=${date}`)
//                 .then(response => {
//                         console.log("data: ", response.data)
//                         return response.data
//                 })
//                 .catch((e) => { throw e })
// }

// export const get_recording_ = () => {
//         return axiosInstance
//                 .get(`${URL_API}/notes`)
//                 .then(response => {
//                         console.log("data: ", response.data)
//                         return response.data
//                 })
//                 .catch((e) => { throw e })
// }

// export const get_recording_all = (page: number) => {
//         return axiosInstance
//                 .get(`${URL_API}/notes/requests?page=${page}`)
//                 .then(response => response.data)
//                 .catch((e) => {
//                         console.log('asdfaasdf: ', e)
//                         throw e
//                 })
// }

// export const api_recording_accepted = (id: any) => {
//         return axiosInstance.post(
//                 `${URL_API}/notes/update`,
//                 {
//                         id,
//                         status: "ACCEPTED",
//                 }
//         ).then(data => data)
//                 .catch(e => { throw e })
// }

// export const api_recording_refused = (id: any) => {
//         return axiosInstance.post(
//                 `${URL_API}/notes/update`,
//                 {
//                         id,
//                         status: "REFUSED",
//                 }
//         ).then(data => data)
//                 .catch(e => { throw e })
// }

// export const get_recording_detail = (uuid: string) => {
//         return axiosInstance
//                 .get(`${URL_API}/note/${uuid}`)
//                 .then(response => response.data)
//                 .catch((e) => {
//                         console.log('asdfaasdf: ', e)
//                         throw e
//                 })
// }