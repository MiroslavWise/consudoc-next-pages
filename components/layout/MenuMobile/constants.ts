export interface ILinkFooter {
    label: string
    img: string
    path: string
}

export const LinksDoctor: ILinkFooter[] = [
    {
        label: "Специальность",
        img: "/svg/footer-menu/__item__/file-heart.svg",
        path: "/specialization",
    },
    {
        label: "Финансы",
        img: "/svg/footer-menu/__item__/coins-swap.svg",
        path: "/pay-data",
    },
    {
        label: "Архив",
        img: "/svg/footer-menu/__item__/archive.svg",
        path: "/archive",
    },
    {
        label: "Чат",
        img: "/svg/footer-menu/__item__/message-chat.svg",
        path: "/chat",
    },
    {
        label: "Профиль",
        img: "/svg/footer-menu/__item__/profile.svg",
        path: "/profile",
    },
]

export const LinksPatient: ILinkFooter[] = [
    {
        label: "Поиск",
        img: "/svg/footer-menu/__item__/search.svg",
        path: "/doctors",
    },
    {
        label: "Финансы",
        img: "/svg/footer-menu/__item__/coins-swap.svg",
        path: "/pay-data",
    },
    {
        label: "Мед. карта",
        img: "/svg/footer-menu/__item__/file-heart.svg",
        path: "/medical-record",
    },
    {
        label: "Чат",
        img: "/svg/footer-menu/__item__/message-chat.svg",
        path: "/chat",
    },
    {
        label: "Профиль",
        img: "/svg/footer-menu/__item__/profile.svg",
        path: "/profile",
    },
]
