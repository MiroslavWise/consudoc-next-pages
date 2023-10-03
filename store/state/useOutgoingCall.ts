import { create } from "zustand"

import type { IUseOutgoingCall } from "../types/createOutgoingCall"

export const useOutgoingCall = create<IUseOutgoingCall>((set, get) => ({
    state: undefined,

    setState(value) {
        if (value) {
            set({ state: value })
        } else {
            set({ state: undefined })
        }
    },
}))
