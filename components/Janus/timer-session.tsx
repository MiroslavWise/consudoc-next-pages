"use client"

import { type FC, useEffect, type DispatchWithoutAction } from "react"

import { useCallJanus } from "@/store/state/useCallJanus"

interface IProps {
    visible?: boolean
    doHangup: DispatchWithoutAction
    isDoctor?: boolean
}

export const TimerSession: FC<IProps> = ({ visible, doHangup, isDoctor }) => {
    const currentTime = useCallJanus(({ currentTime }) => currentTime)
    const getTimerCurrent = useCallJanus(({ getTimerCurrent }) => getTimerCurrent)

    let minute = Math.floor(currentTime! / 60)
        .toString()
        .padStart(2, "0")
    let second = (+currentTime! - +minute * 60).toString().padStart(2, "0")
    useEffect(() => {
        if (currentTime! < 1) {
            doHangup()
        }
    }, [currentTime])

    useEffect(() => {
        const interval = () =>
            setInterval(() => {
                getTimerCurrent()
            }, 1000)

        if (visible) interval()

        return () => clearInterval(interval())
    }, [visible])

    return currentTime ? (
        <>
            {currentTime! < 20 * 60 - 5 && currentTime! > 20 * 59 && !isDoctor && (
                <p className={`${currentTime! - 20 * 59 < 3 && "red_timer"}`}>
                    Если вас устраивает качество связи, то через {currentTime! - 20 * 59}{" "}
                    секунд начнётся списание денег
                </p>
            )}
            <span
                className={`${currentTime! < 60 && "red_timer"}`}
                style={{ alignSelf: "center" }}
            >
                {minute}:{second}
            </span>
        </>
    ) : null
}
