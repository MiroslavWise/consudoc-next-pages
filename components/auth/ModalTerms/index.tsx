"use client"

import { type ReactNode, useMemo } from "react"

import type { TModalTerms, TOfferOrTerms } from "./types"

import { PublicOffer } from "@/components/terms/public-offer"
import { TermsOfUse } from "@/components/terms/terms-of-use"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

const ModalTerms: TModalTerms = ({ visible, type, set }) => {
    if (type === null) {
        return null
    }
    const content = useMemo(() => {
        const obj: Record<TOfferOrTerms, ReactNode> = {
            offer: <PublicOffer />,
            terms: <TermsOfUse />,
        }

        return obj[type]
    }, [type])

    return (
        <div
            className={cx(styles.wrapper, visible && styles.active)}
            onClick={() => set({ visible: false, type: null })}
        >
            <ul>{content}</ul>
        </div>
    )
}

export default ModalTerms
