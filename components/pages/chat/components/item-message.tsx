import { FC } from "react"
import dayjs from "dayjs"
import Image from "next/image"

import { Typography } from "antd/lib"
import { photoReplace } from "@/lib/replace-https"

interface IProps {
    uuid: string | number
    photo: string
    id: string
    messages: {
        text: string
        key: string
        time: string | Date
    }[]
    name: string
}

const { Text } = Typography

const itemAlign = (i: number, length: number): string => {
    if (length === 1) {
        return "middle"
    }

    if (i === 0) {
        return "start"
    }

    if (i === length - 1) {
        return "end"
    }

    return ""
}

const ItemMessageCompanion: FC<IProps> = ({ uuid, photo, messages, name, id }) => {
    return (
        <div className="item-container-companion">
            <div>
                <Image height={30} width={30} src={photoReplace(photo)} alt="avatar" unoptimized />
            </div>
            <div className="block-messages">
                {messages?.map((item, index) => (
                    <div className={`item-message ${itemAlign(index, messages?.length)}`} key={item?.key}>
                        <p>{item?.text}</p>
                    </div>
                ))}
                <p className="time" id={id}>
                    {dayjs(messages?.at(-1)?.time).format("HH:mm")}
                </p>
            </div>
        </div>
    )
}

const ItemMessageMy: FC<IProps> = ({ uuid, photo, messages, name, id }) => {
    return (
        <div className="item-container-my">
            <div className="container-my">
                <div className="block-messages">
                    {messages?.map((item, index) => (
                        <div className={`item-message ${itemAlign(index, messages?.length)}`} key={item?.key}>
                            <p>{item?.text}</p>
                        </div>
                    ))}
                    <p className="time" id={id}>
                        {dayjs(messages?.at(-1)?.time).format("HH:mm")}
                    </p>
                </div>
                <div>
                    <Image height={30} width={30} src={photoReplace(photo)} alt="avatar" unoptimized />
                </div>
            </div>
        </div>
    )
}

export { ItemMessageCompanion, ItemMessageMy }
