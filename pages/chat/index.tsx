import { ProfileLayout } from "@/components/layout/ProfileLayout"
import { ChatUUID, ListChat } from "@/components/pages/chat"
import { useSearchParams } from "next/navigation"

export default function Chats() {
    const uuid = useSearchParams().get("uuid")

    return (
        <ProfileLayout>
            <ListChat>{uuid ? <ChatUUID uuid={uuid!} /> : null}</ListChat>
        </ProfileLayout>
    )
}
