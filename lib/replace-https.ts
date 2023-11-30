import { URL } from "@/services/general-api"

export function replaceHttps(value: string): string {
    if (typeof value === "string") {
        if (value?.split("/").filter((i) => i)?.[0] === "media") return `${URL.replace("/api/v1", "")}${value}`
        return value?.replace("http:/", "https:/")
    }
    return ""
}

export const photoReplace = (value: string): string => `${URL}${value}`
