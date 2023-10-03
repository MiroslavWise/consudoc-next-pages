import { Dispatch, DispatchWithoutAction } from "react"

export type TStatus = "online" | "offline" | "busy" | ""

export interface IFilters {
    price_gte: number
    price_lte: number
    doctor__status: TStatus
    verified: boolean
    page: number
}

export interface IUseFilters {
    loading: boolean
    filters: IFilters
    total: number | undefined
    isVisible: boolean
    priceOffer: TPriceOffer

    setPage: Dispatch<number>
    setStatus: Dispatch<TStatus>
    usePriceOffer(value: TPriceOffer): void
    getReset: DispatchWithoutAction
    getFilter: Dispatch<IFilters>
    setIsVisible: Dispatch<boolean>
    setTotal: Dispatch<number | undefined>
}

export type TPriceOffer = "economy" | "business" | "premium" | "vip" | null

export interface IDataDoctor {
    consultation_time: {
        id: number
        price: string
        sessions_time: string
    }[]
    id: number
    profile: {
        avatar_url: string
        full_name: string
        id: number
        status: TStatus
        verified: boolean
    }
    doctor_id: number
    spec_rating: string
    specialization: {
        consult_issues: string
        description: string
        id: number
        name: string
    }
    specialization_id: number
}
