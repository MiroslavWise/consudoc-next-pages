import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IUseArchive, IItemArchive } from "../types/useArchive"


export const useArchive = create(
    persist<IUseArchive>(
        (set, get) => ({
            total: undefined,
            page: 1,

            setTotal(value) {
                set({ total: value })
            },
            setPage(value) {
                set({ page: value })
            },
            resetArchive() {
                set({
                    total: undefined,
                    page: 1,
                })
            },
        }),
        {
            name: "archive",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
