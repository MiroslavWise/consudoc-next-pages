import { requestGET } from "./general-api"

export const apiListChat = () => requestGET<IChat[]>(`chats`)
export const apiChat = (uuid: string) => requestGET<IChat>(`chat/${uuid}`)
export const apiChatMessages = (uuid: string) => requestGET<IMessagesChat>(`chat-messages/${uuid}`)

interface ILittleProfile {
    email: string
    full_name: string
    id: number
    photo_url: string
}

interface IChat {
    uuid: string
    created_at: Date
    updated_at: Date
    doctor: ILittleProfile
    messages: IMessage[]
    patient: ILittleProfile
}

export interface IMessage {
    created_at: Date
    updated_at: Date
    from_user: ILittleProfile // от кого, емиттер
    id: number
    is_read: boolean
    replying_to: string | null
    text: string
    to_user: ILittleProfile //к кому, рессивер
    uuid: string
}

export interface IMessagesChat {
    count: number
    results: IMessage[]
}
