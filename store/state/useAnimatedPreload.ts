import { create } from "zustand"
import type { IUseAnimatedPreload } from "../types/useAnimatedPreload"

export const useAnimatedPreload = create<IUseAnimatedPreload>((set) => ({
    isAnimated: false,
    activated: () => set({ isAnimated: true }),
    deactivated: () => set({ isAnimated: false }),
}))
