function charsum(s: any): number {
    let sum = 0
    for (let i = 0; i < s.length; i++) {
        sum += s.charCodeAt(i) * (i + 1)
    }
    return sum
}

export function arrayHash(a: any[] | undefined): string | undefined {
    if (!a) return undefined

    let sum = 0

    for (let i = 0; i < a.length; i++) {
        let cs = charsum(a[i])
        sum = sum + 65027 / cs
    }
    return ("" + sum).slice(0, 16)
}
