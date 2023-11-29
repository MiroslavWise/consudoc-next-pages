import { memo } from "react"
import Image from "next/image"
import { isMobile } from "react-device-detect"

import { Links } from "./components/Links"

import { useProfile } from "@/store/state"
import { usePush } from "@/hooks/usePath"

import styles from "./style.module.scss"

export const LeftSideBar = memo(function LeftSideBar() {
    const profile = useProfile(({ profile }) => profile)
    const { handlePush } = usePush()

    const { photo, user } = profile ?? {}
    const { get_full_name } = user ?? {}

    return !isMobile ? (
        <aside className={styles.wrapper}>
            <header onClick={() => handlePush("/profile")}>
                <div>
                    {photo ? (
                        <Image
                            src={photo!}
                            alt="avatar"
                            height={400}
                            width={400}
                            unoptimized
                        />
                    ) : null}
                </div>
                <p>{get_full_name || ""}</p>
            </header>
            <Links />
        </aside>
    ) : null
})
