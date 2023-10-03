export const regExEmail =
    /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/

export const checkExEmail = (value: string): boolean => regExEmail.test(value)

export const regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g

export const checkPasswordStrength = (password: string): boolean =>
    regExPassword.test(password)

export function transliterateAndReplace(string: string): string {
    if (!string) {
        return ""
    }
    const transliteration: Record<string, string> = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "yo",
        ж: "zh",
        з: "z",
        и: "i",
        й: "y",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "kh",
        ц: "ts",
        ч: "ch",
        ш: "sh",
        щ: "sch",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
        " ": "-",
    }

    return string
        .toLowerCase()
        .trim()
        .replace(/ +/g, " ")
        .replace(/./g, (char) =>
            typeof transliteration[char] === "string" ? transliteration[char] : char
        )
}
