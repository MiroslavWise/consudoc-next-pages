const SCSS = []

const SVG = [
    "/svg/x-close.svg",
    "/svg/visa.svg",
    "/svg/video.svg",
    "/svg/video-red.svg",
    "/svg/user-edit.svg",
    "/svg/search.svg",
    "/svg/profile.svg",
    "/svg/android.svg",
    "/svg/arrow-left.svg",
    "/svg/chevron-down-double.svg",
    "/svg/chevron-left.svg",
    "/svg/chevron-selector-vertical.svg",
    "/svg/chevron-up-double.svg",
    "/svg/mastercard.svg",
    "/svg/pay.svg",
    "/svg/main-logo.svg",
    "/svg/logo.svg",
    "/svg/logo-full.svg",
    "/svg/log-out.svg",
    "/svg/kazinno.svg",
    "/svg/ios.svg",
    "/svg/image-user-up.svg",
    "/svg/file-plus.svg",
    "/svg/consudoc.svg",
    "/svg/footer-menu/fill/archive.svg",
    "/svg/footer-menu/fill/coins-swap.svg",
    "/svg/footer-menu/fill/file-heart.svg",
    "/svg/footer-menu/fill/message-chat.svg",
    "/svg/footer-menu/fill/profile.svg",
    "/svg/footer-menu/fill/search.svg",
    "/svg/footer-menu/regular/archive.svg",
    "/svg/footer-menu/regular/coins-swap.svg",
    "/svg/footer-menu/regular/file-heart.svg",
    "/svg/footer-menu/regular/message-chat.svg",
    "/svg/footer-menu/regular/profile.svg",
    "/svg/footer-menu/regular/search.svg",
    "/svg/four-steps/clock.svg",
    "/svg/four-steps/messages.svg",
    "/svg/four-steps/pc.svg",
    "/svg/four-steps/purse.svg",
    "/call-svg/microphone-off.svg",
    "/call-svg/microphone-on.svg",
    "/call-svg/phone-hang-up.svg",
    "/call-svg/video-recorder-off.svg",
    "/call-svg/video-recorder-on.svg",
    "/market/apple-s.svg",
    "/market/play-m.svg",
]

const PNG = [
    "/images/default.avif",
    "/png/default_avatar.avif",
    "/png/start-picture.avif",
    "/sound/new_message_tone.mp3",
    "/sound/new_message_tone.wav",
    "/sound/nothing.wav",
    "/sound/zvuk-skayp-skype-call-calling-23010.wav",
]

const installEvent = () => {
    self.addEventListener("install", (event) => {
        async function onInstall() {
            return caches
                .open("static")
                .then((cache) => cache.addAll([...SVG, ...PNG, ...SCSS]))
        }

        event.waitUntil(onInstall(event))
    })
}
installEvent()
