interface IValues {
    image: {
        src: string
        width: number
        height: number
    }
    title: string
}

export const FOUR_STEPS: IValues[] = [
    {
        image: {
            src: "/svg/four-steps/clock.svg",
            width: 80,
            height: 90,
        },
        title: "Установите длительность консультации",
    },
    {
        image: {
            src: "/svg/four-steps/purse.svg",
            width: 94,
            height: 79,
        },
        title: "Определите цену",
    },
    {
        image: {
            src: "/svg/four-steps/messages.svg",
            width: 97,
            height: 102,
        },
        title: "Выберите специалиста",
    },
    {
        image: {
            src: "/svg/four-steps/pc.svg",
            width: 90,
            height: 90,
        },
        title: "Консультируйтесь у конкретного доктора",
    },
]
