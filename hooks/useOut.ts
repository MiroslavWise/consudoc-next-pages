import { usePush } from "@/hooks/usePath"
import { switchStatus } from "@/services/doctors"
import { useArchive, useAuth } from "@/store/state"

export const useOut = () => {
    const { out: logOut } = useAuth()
    const { handleReplace } = usePush()
    const { resetArchive } = useArchive()
    async function out() {
        await switchStatus("offline")
        handleReplace("/")
        resetArchive()
        if (logOut) logOut()
    }

    return { out }
}
