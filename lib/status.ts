import type { TStatus } from "@/store/types/useFilters"

export const status: Record<TStatus, string> = {
    online: "В сети",
    offline: "Не в сети",
    busy: "Занят",
    "": "Не в сети",
}
