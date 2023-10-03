import { create } from "zustand"

import type { IFilters, IUseFilters, TPriceOffer, TStatus } from "../types/useFilters"

const filters: IFilters = {
    price_gte: 0,
    price_lte: 100_000,
    doctor__status: "online",
    verified: true,
    page: 1,
}

export const useFilters = create<IUseFilters>((set, get) => ({
    loading: false,
    isVisible: false,
    filters: filters,
    total: undefined,
    priceOffer: null,

    setStatus(value) {
        set({
            filters: {
                ...get().filters,
                doctor__status: value,
            },
        })
    },
    usePriceOffer(value) {
        let price: [number, number] = [0, 100_000]
        if (value === null) {
        }
        if (value === "economy") {
            price = [0, 1_000]
        }
        if (value === "business") {
            price = [1_001, 4_000]
        }
        if (value === "premium") {
            price = [4_001, 8_000]
        }
        if (value === "vip") {
            price = [8_001, 100_000]
        }
        set({
            filters: {
                ...get().filters,
                price_gte: price[0],
                price_lte: price[1],
            },
            priceOffer: value,
        })
    },
    getReset() {
        set({ filters: filters })
    },
    setPage(value) {
        set({
            filters: {
                ...get().filters,
                page: value,
            },
        })
    },
    getFilter(values) {
        set({
            filters: {
                price_gte: values.price_gte || 0,
                price_lte: values.price_lte || 100_000,
                doctor__status: values.doctor__status,
                verified: values.verified,
                page: values.page,
            },
        })
    },
    setIsVisible(value) {
        set({ isVisible: value })
    },
    setTotal(value) {
        set({ total: value })
    },
}))

export const BUTTONS_STATUS_ONLINE: { value: TStatus; label: string }[] = [
    {
        label: "Все",
        value: "",
    },
    {
        label: "В сети",
        value: "online",
    },
    {
        label: "Не в сети",
        value: "offline",
    },
    {
        label: "Занят",
        value: "busy",
    },
]

export const BUTTONS_PRICE_OFFER: { value: TPriceOffer }[] = [
    {
        value: "economy",
    },
    {
        value: "business",
    },
    {
        value: "premium",
    },
    {
        value: "vip",
    },
]
