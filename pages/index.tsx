import { useEffect } from "react"

import { usePush } from "@/hooks/usePath"
import { useProfile } from "@/store/state/useProfile"
import { useAnimatedPreload } from "@/store/state/useAnimatedPreload"

export default function Home() {
    const { isDoctor, loading } = useProfile()
    const { handlePush } = usePush()
    const { activated, deactivated } = useAnimatedPreload()

    useEffect(() => {
        if (typeof isDoctor === "undefined") {
        }
        if (isDoctor === false) {
            handlePush(`/doctors`)
        }
        if (isDoctor === true) {
            handlePush(`/archive`)
        }

        return deactivated
    }, [isDoctor])

    useEffect(() => {
        if (loading) {
            activated()
        }
    }, [loading])

    return <div className="main_pages" />
}
