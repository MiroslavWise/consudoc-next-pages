import { create } from "zustand"

import type { ICreateFeedback } from "../types/createFeedback"

export const useFeedback = create<ICreateFeedback>((set, get) => ({
    isVisible: false,

    setIsVisible(value) {
        set({ isVisible: value })
    },
}))
