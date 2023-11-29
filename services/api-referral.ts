import { requestPOST, requestGET } from "./general-api"

export const apiReferralPrice = async () =>
    requestGET<IResponseReferralPrice & IResponseReferralPriceMessage>(`referral-price`)

export const apiPostReferralLinkBuy = () =>
    requestPOST<IResponseReferralPrice>(`referral-link-buy`, {})

interface IResponseReferralPrice {
    id: string
    profile?: number
    amount: string
    created_at: Date
    updated_at: Date
}

type TMessageReferral =
    | "Реферальная ссылка уже активна!"
    | "Недостаточно средств на счёту!"
    | "No referral price found"

interface IResponseReferralPriceMessage {
    message: TMessageReferral
}
