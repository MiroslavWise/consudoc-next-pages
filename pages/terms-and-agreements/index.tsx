import { ReactNode, useMemo } from "react"
import { useSearchParams } from "next/navigation"

import { ProfileLayout } from "@/components/layout/ProfileLayout"

import { Links } from "@/components/terms/components/Links"

import { CONTENTS_MODAL, TValueLinkTerms } from "@/components/terms/constants"

import styleLayout from "./layout.module.scss"
import stylesPage from "./page.module.scss"

export default function TermsAndAgreements() {
    const currentTerms = useSearchParams().get("current")

    const content: ReactNode | null = useMemo(() => {
        if (!currentTerms) return null
        if (!Object.keys(CONTENTS_MODAL).includes(currentTerms)) return null
        return CONTENTS_MODAL[currentTerms as TValueLinkTerms]
    }, [currentTerms])

    return (
        <ProfileLayout>
            <div className={styleLayout.wrapper}>
                <section>
                    <header>
                        <p>Условия и соглашения</p>
                    </header>
                    <div>
                        <Links />
                    </div>
                </section>
                <div className={stylesPage.wrapper}>
                    <header></header>
                    <section>{content}</section>
                </div>
            </div>
        </ProfileLayout>
    )
}
