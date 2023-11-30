import { useEffect, useMemo, useRef } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import { ItemMessageCompanion, ItemMessageMy } from "../components/item-message"

import { useAuth } from "@/store/state"
import { getProfile } from "@/services/profile"
import { useWeb } from "@/context/useWebSocket"
import { joinMessages } from "@/lib/join-messages"
import { apiChat, apiChatMessages } from "@/services/api-chat"

import styles from "../styles/layout-chat-uuid.module.scss"
import { ItemUserMessage } from "../components/ItemUserMessage"
import { ItemMyMessage } from "../components/ItemMyMessage"
import { ItemTime } from "../components/ItemTime"

export const ChatUUID = ({ uuid }: { uuid: string }) => {
    const token = useAuth(({ token }) => token)
    const { wsChannel } = useWeb()
    const { register, handleSubmit, setValue, reset, watch } = useForm<IValues>({})
    const ulChat = useRef<HTMLUListElement>(null)
    const numberIdMessage = useRef<string | null>(null)

    const { data: dataProfile, isLoading: isLoadingProfile } = useQuery({
        queryFn: () => getProfile(),
        queryKey: ["profile", token],
        enabled: !!token,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const { data: dataChat } = useQuery({
        queryFn: () => apiChat(uuid),
        queryKey: ["chat", `uuid=${uuid}`],
    })

    const { data, isLoading, refetch } = useQuery({
        queryFn: () => apiChatMessages(uuid),
        queryKey: ["chat-messages", `uuid=${uuid}`],
    })

    const messages = useMemo(() => {
        if (data?.res && Array.isArray(data?.res?.results)) {
            return joinMessages(data?.res?.results || [])
        }
        return null
    }, [data])

    const myId = useMemo(() => {
        return dataProfile?.res?.profile?.profile_id || null
    }, [dataProfile?.res?.profile?.profile_id])

    const interviewer: number | null = useMemo(() => {
        if (!dataChat || !myId) {
            return null
        } else {
            return dataChat?.res?.doctor?.id === myId ? dataChat?.res?.patient?.id! : dataChat?.res?.doctor?.id!
        }
    }, [myId, dataChat])

    function submit(values: IValues) {
        if (values.text.trim().length > 1 && myId && interviewer) {
            wsChannel?.send(
                JSON.stringify({
                    data: {
                        type: "chat_message",
                        receiver_id: interviewer,
                        chat_uuid: uuid,
                        sender_id: myId,
                        text: values.text,
                    },
                })
            )

            setTimeout(() => {
                reset()
            }, 24)
        }
    }

    const onSubmit = handleSubmit(submit)

    useEffect(() => {
        const eventMessage = (event: MessageEventInit<any>) => {
            const response = JSON.parse(event?.data)?.data
            if (response?.message_info?.chat_uuid === uuid && response?.type === "message_notification") {
                refetch()
            }
            if (response?.message === "receive ok!") {
                refetch()
            }
        }

        wsChannel?.addEventListener("message", eventMessage)

        return () => wsChannel?.removeEventListener("message", eventMessage)
    }, [wsChannel])

    useEffect(() => {
        requestAnimationFrame(() => {
            if (messages && messages?.length > 0) {
                if (ulChat.current) {
                    const top = ulChat.current.scrollHeight
                    ulChat.current?.scroll({
                        top: top + 150,
                    })
                }
            }
        })
    }, [messages, uuid])

    return (
        <div className={styles.wrapper}>
            <ul ref={ulChat}>
                {isLoading || isLoadingProfile
                    ? null
                    : messages
                    ? messages.map((item) => {
                          if (item.type === "time") {
                              return <ItemTime time={item.time!} key={`${item.time}-time`} />
                          }
                          if (item.type === "messages") {
                              if (item.user === myId) {
                                  return (
                                      <ItemMyMessage key={`${item.id}-container-me`} messages={item.messages!} photo={item.photo!} />
                                  )
                              } else {
                                  return (
                                      <ItemUserMessage key={`${item.id}-container-me`} messages={item.messages!} photo={item.photo!} />
                                  )
                              }
                          }
                          return null
                      })
                    : null}
            </ul>
            <form onSubmit={onSubmit}>
                <textarea
                    {...register("text", { required: true, min: 2 })}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13 || event.code === "Enter") {
                            onSubmit()
                        }
                    }}
                    maxLength={512}
                />
                <button type="submit" data-active={watch("text")?.trim()?.length > 1}>
                    <img src="/svg/send-01.svg" alt="send" width={20} height={20} />
                </button>
            </form>
        </div>
    )
}

interface IValues {
    text: string
}
