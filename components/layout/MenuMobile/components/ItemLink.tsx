import { memo } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { motion } from "framer-motion"

import { type TItemLink } from "./types/types"

import { cx } from "@/lib/cx"
import { usePush } from "@/hooks/usePath"

import styles from "./styles/item-link.module.scss"

export const ItemLink: TItemLink = memo(({ label, img, path }) => {
    const router = useRouter()
    const { handlePush } = usePush()

    const active: boolean = router.pathname.includes(path)

    function handleTouch() {
        handlePush(path)
    }

    return (
        <div className={cx(styles.container, active && styles.active)} onClick={handleTouch}>
            {active && (
                <motion.div
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.6 }}
                    transition={{ duration: 1 }}
                    style={{ width: 28, height: 28 }}
                >
                    <Image
                        src={img.replace("__item__", "fill")}
                        alt={img}
                        width={28}
                        height={28}
                    />
                </motion.div>
            )}
            {!active && (
                <motion.div
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.6 }}
                    transition={{ duration: 1 }}
                    style={{ width: 28, height: 28 }}
                >
                    <Image
                        src={img.replace("__item__", "regular")}
                        alt={img}
                        width={28}
                        height={28}
                    />
                </motion.div>
            )}
            <p>{label}</p>
        </div>
    )
})
