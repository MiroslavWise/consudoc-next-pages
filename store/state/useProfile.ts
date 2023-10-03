import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { IProf, IUseProfile } from "../types/useProfile"
import { getProfile } from "@/services/profile"
import { TStatus } from "../types/useFilters"

export const useProfile = create(
    persist<IUseProfile>(
        (set, get) => ({
            loading: undefined,
            isDoctor: undefined,
            isStaff: undefined,
            profile: undefined,
            user: undefined,

            asyncUpdateStatus() {
                if (get().isDoctor) {
                    if (!!get().profile) {
                        const status: TStatus =
                            get().profile?.status === "online" ? "offline" : "online"
                        set({
                            profile: {
                                ...(get().profile as IProf),
                                status: status,
                            },
                        })
                    }
                }
            },
            async setProfile() {
                set({ loading: true })
                return getProfile()
                    .then((response) => {
                        if (response) {
                            const user = response?.res?.profile?.user
                            const profile = { ...response?.res?.profile! }
                            const isStaff = response?.res?.profile?.is_accountant
                            const isDoctor = response?.res?.profile?.user?.is_doctor
                            set({ isStaff, isDoctor, profile, user })
                        }
                    })
                    .finally(() => {
                        set({
                            loading: false,
                        })
                    })
            },
            reset() {
                set({
                    loading: undefined,
                    isDoctor: undefined,
                    isStaff: undefined,
                    profile: undefined,
                    user: undefined,
                })
            },
        }),
        {
            name: "profile",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
