export const LINKS_PROFILE: ILinksProfile[] = [
    {
        label: "Редактировать",
        value: "/change",
    },
    {
        label: "Архив консультаций",
        value: "/archive",
    },
    {
        label: "Платёжные данные",
        value: "/pay-data",
    },
    {
        label: "Условия и соглашения",
        value: "/terms-and-agreements",
    },
]

interface ILinksProfile {
    label: string
    value: string
}
