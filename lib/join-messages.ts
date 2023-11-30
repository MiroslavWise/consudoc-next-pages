import { IMessage } from "@/services/api-chat"
import dayjs from "dayjs"

export interface IReturnMessages {
    messages?: {
        text: string
        id: string
        time: Date | string
    }[]
    type: "messages" | "time"
    time?: string
    name?: string
    photo?: string
    user?: number
    id?: string
}

function joinMessages(item_messages: IMessage[]): IReturnMessages[] {
    const items: IReturnMessages[] = []

    if (item_messages) {
        item_messages.forEach((message, index) => {
            if (index === 0) {
                items.push({
                    type: "time",
                    time: dayjs(message.created_at).format("DD.MM.YYYY"),
                })
            }
            if (
                index !== 0 &&
                dayjs(message.created_at).format("DD.MM.YYYY") !== dayjs(items.at(-1)?.messages?.at(-1)?.time).format("DD.MM.YYYY")
            ) {
                items.push({
                    type: "time",
                    time: dayjs(message.created_at).format("DD.MM.YYYY"),
                })
            }
            if (items.at(-1)?.user === message?.from_user?.id) {
                items.at(-1)?.messages?.push({
                    text: message?.text || "",
                    id: `${message?.id}`,
                    time: message?.created_at!,
                })
            } else {
                items.push({
                    id: `${message.uuid}`,
                    type: "messages",
                    user: message?.from_user?.id!,
                    photo: message?.from_user?.photo_url!,
                    messages: [
                        {
                            text: message?.text,
                            id: `${message?.id}-${message.uuid}`,
                            time: message?.created_at!,
                        },
                    ],
                })
            }
        })
    }

    return items
}

export { joinMessages }
