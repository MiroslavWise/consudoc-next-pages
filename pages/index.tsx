import { useEffect } from "react"

import { usePush } from "@/hooks/usePath"
import { useProfile, useAnimatedPreload } from "@/store/state"

export default function Home() {
    const { handlePush } = usePush()
    const isDoctor = useProfile(({ isDoctor }) => isDoctor)
    const loading = useProfile(({ loading }) => loading)
    const activated = useAnimatedPreload(({ activated }) => activated)
    const deactivated = useAnimatedPreload(({ deactivated }) => deactivated)

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
