import { ReactNode } from "react"

import { PublicOffer } from "@/components/terms/public-offer"
import { RulesOfUse } from "@/components/terms/rules-of-use"
import { TermsOfUse } from "@/components/terms/terms-of-use"
import { OnlinePayments } from "@/components/terms/online-payments"
import { VoluntaryConsent } from "@/components/terms/voluntary-consent"

export const LINK_TERMS: ILinkTerms[] = [
    {
        label: "Условия использования",
        value: "terms-of-use",
    },
    {
        label: "Публичная оферта",
        value: "public-offer",
    },
    {
        label: "Добровольное согласие",
        value: "voluntary-consent",
    },
    {
        label: "Правила пользования",
        value: "rules-of-use",
    },
    {
        label: "Онлайн платежи",
        value: "online-payments",
    },
]

export type TValueLinkTerms =
    | "terms-of-use"
    | "public-offer"
    | "voluntary-consent"
    | "rules-of-use"
    | "online-payments"
export interface ILinkTerms {
    label: string
    value: TValueLinkTerms
}

export interface IValueStateVisibleTerms {
    value: TValueLinkTerms | null
    visible: boolean
}

export const CONTENTS_MODAL: Record<TValueLinkTerms, ReactNode> = {
    "online-payments": <OnlinePayments />,
    "public-offer": <PublicOffer />,
    "rules-of-use": <RulesOfUse />,
    "terms-of-use": <TermsOfUse />,
    "voluntary-consent": <VoluntaryConsent />,
}
