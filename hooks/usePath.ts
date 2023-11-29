import { useRouter } from "next/router"
import { usePathname } from "next/navigation"
import { useAnimatedPreload } from "@/store/state/useAnimatedPreload"
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const usePush = () => {
    const { push, replace } = useRouter()
    const pathname = usePathname()
    const activated = useAnimatedPreload(({ activated }) => activated)

    function handlePush(value: string, options?: NavigateOptions) {
        if (pathname !== value) {
            activated()
        }
        push(value, undefined, options)
    }

    function handleReplace(value: string, options?: NavigateOptions) {
        replace(value, undefined, options)
    }

    return { handlePush, handleReplace }
}
