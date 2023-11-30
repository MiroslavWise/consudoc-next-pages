import { TStatusAmount } from "@/services/api-order"

export const SVG: Record<TStatusAmount, string> = {
    charged: "/svg/order/credit-card-check.svg",
    rejected: "/svg/order/credit-card-x.svg",
    new: "/svg/order/credit-card-download.svg",
    declined: "/svg/order/shield-zap.svg",
    fraud: "/svg/order/shield-dollar.svg",
    validation: "/svg/order/credit-card-lock.svg",
    error: "/svg/order/brackets-x.svg",
}

export const TYPES_TRANSACTIONS: { img: string; label: string }[] = [
    {
        img: SVG.charged,
        label: "Успешное зачисление средст",
    },
    {
        img: SVG.new,
        label: "Идёт исполнение транзакции (транзация не закончилась)",
    },
    {
        img: SVG.rejected,
        label: "Транзакция отклонена шлюзом",
    },
    {
        img: SVG.validation,
        label: "Запрос не обработан, т.к. не прошел валидацию",
    },
    {
        img: SVG.fraud,
        label: "Транзакция отклонена системой защиты от мошеннических транзакций в шлюзе",
    },
    {
        img: SVG.declined,
        label: "Эквайер отклонил транзакцию",
    },
    {
        img: SVG.error,
        label: "Отказ из-за ошибки на стороне эквайера или шлюза",
    },
]
