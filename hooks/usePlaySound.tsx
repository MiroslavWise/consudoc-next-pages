import { useEffect, useRef, useState } from "react"

const usePlaySound = () => {
    const [audiosWeWantToUnlock, setAudiosWeWantToUnlock] = useState<HTMLAudioElement[]>([])
    const audioCtx = new AudioContext()

    useEffect(() => {
        setAudiosWeWantToUnlock((prev) => [...prev, new Audio("../../sound/nothing.wav")])

        const isTouched = () => {
            if (audiosWeWantToUnlock != null) {
                for (const audio of audiosWeWantToUnlock) {
                    const source = audioCtx.createMediaElementSource(audio)
                    source.connect(audioCtx.destination)
                    audio.play()
                    audio.pause()
                    audio.currentTime = 0
                }
                setAudiosWeWantToUnlock([])
            }
        }

        window?.addEventListener("touchstart", isTouched, false)

        const nothing = new Audio("../../sound/nothing.wav")

        nothing
            .play()
            .then(() => {
                console.log("Audio is playing")
            })
            .catch(() => {})
        return () => {
            window?.removeEventListener("touchstart", isTouched)
        }
    }, [])

    const playSoundSwitchStatus = () => {
        const onlineStatusSound = "../../sound/new_message_tone.mp3"
        setAudiosWeWantToUnlock((prev) => [...prev, new Audio(onlineStatusSound)])
        if (audiosWeWantToUnlock != null) {
            for (const audio of audiosWeWantToUnlock) {
                const source = audioCtx.createMediaElementSource(audio)
                source.connect(audioCtx.destination)
                audio.play()
                // audio.pause()
                // audio.currentTime = 0
            }
            setAudiosWeWantToUnlock([])
        }
        console.log("Sound 111111111111")
    }

    const incomingDoctorCall = () => {
        const callSound = "../../sound/zvuk-skayp-skype-call-calling-23010.wav"
        setAudiosWeWantToUnlock((prev) => [...prev, new Audio(callSound)])
        if (audiosWeWantToUnlock != null) {
            for (const audio of audiosWeWantToUnlock) {
                const source = audioCtx.createMediaElementSource(audio)
                source.connect(audioCtx.destination)
                audio.play()
                // audio.pause()
                // audio.currentTime = 0
            }
            setAudiosWeWantToUnlock([])
        }
    }

    return { playSoundSwitchStatus, incomingDoctorCall }
}

export default usePlaySound
