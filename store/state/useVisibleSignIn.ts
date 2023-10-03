import { create } from "zustand"

import { IUseVisibleSignIn } from "../types/useVisibleSignIn"

export const useVisibleSignIn = create<IUseVisibleSignIn>((set, get) => ({
    state: "sign",
    isVisibleModal: false,
    isVisibleContent: false,
    setActivateAnimation() {
        set({
            isVisibleModal: true,
            isVisibleContent: true,
        })
    },
    setDeactivateAnimation() {
        set({
            isVisibleModal: false,
            isVisibleContent: false,
        })
    },
    setState(value) {
        set({ state: value })
    },
}))
