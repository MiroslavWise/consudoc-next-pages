// import { axiosInstance } from './general-api'

// export const message_all_chats = async () => {
//         return await axiosInstance
//                 .get(`/chats`)
//                 .then(data => data.data)
//         .catch(e => {throw e})
// }

// export const chat_current = async (uuid: string) => {
//         return await axiosInstance
//                 .get(`/chat/${uuid}`)
//                 .then(data => data.data)
//                 .catch(e => {throw e})
// }

// export const messages_current = async (uuid: string) => {
//         return await axiosInstance
//                 .get(`/chat-messages/${uuid}`)
//                 .then(data => data.data)
//                 .catch(e => {throw e})
// }