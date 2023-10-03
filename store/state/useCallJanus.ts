import dayjs from "dayjs"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { IUseCallJanus, IUsePropsCallingJanus } from "../types/useCallJanus"

const OVERALL_TIME = 20 * 60

export const useCallJanus = create(
    persist<IUseCallJanus>(
        (set, get) => ({
            time: undefined,
            currentTime: undefined,

            setTime() {
                const time = dayjs().valueOf() / 1000
                set({ time: time })
            },
            getTimerCurrent() {
                if (get().time) {
                    const REMAINING_TIME =
                        get().time! + OVERALL_TIME - dayjs().valueOf() / 1000
                    set({ currentTime: Number(REMAINING_TIME.toFixed(0)) })
                }
            },
            deleteTime() {
                set({ time: undefined, currentTime: undefined })
            },
        }),
        {
            name: "call-janus",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export const usePropsCallingJanus = create(
    persist<IUsePropsCallingJanus>(
        (set, get) => ({
            call_info: undefined,
            doctor_info: undefined,
            user_info: undefined,
            idRoom: undefined,
            uuidRoom: undefined,

            setUuidRoom(value) {
                set({ uuidRoom: value })
            },
            setIdRoom(value) {
                set({ idRoom: value })
            },
            setCallInfo(value) {
                set({
                    call_info: value,
                    uuidRoom: value?.uuid,
                })
            },
            setDoctorInfo(value) {
                set({
                    doctor_info: value,
                })
            },
            setUserInfo(value) {
                set({
                    user_info: value,
                })
            },
            deleteAll() {
                set({
                    call_info: undefined,
                    doctor_info: undefined,
                    user_info: undefined,
                    idRoom: undefined,
                    uuidRoom: undefined,
                })
            },
        }),
        {
            name: "janus-props",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
