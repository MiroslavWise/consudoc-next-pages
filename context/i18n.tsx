import i18nPlugin from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import en from "@/languages/en"
import kz from "@/languages/kz"
import ru from "@/languages/ru"

export default i18nPlugin
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ru: { translations: ru },
            en: { translations: en },
            kz: { translations: kz },
        },
        fallbackLng: "ru",
        keySeparator: false,
        supportedLngs: ["ru", "en", "kz"],
        ns: ["translations"],
        defaultNS: "translations",
        interpolation: {
            escapeValue: false,
        },
    })
