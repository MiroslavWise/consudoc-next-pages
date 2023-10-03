import Image from "next/image"

import { FOUR_STEPS } from "./constants"

import styles from "./styles/two-screen.module.scss"

export const TwoScreen = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Четыре простых шага к доктору с ConsuDoc</h2>
            </div>
            <div className={styles.fourSteps}>
                {FOUR_STEPS.map((item) => (
                    <div className={styles.item} key={`${item.title}-key-item-two-screen`}>
                        <div className={styles.image}>
                            <Image
                                src={item.image.src}
                                alt={item.image.src}
                                width={item.image.width}
                                height={item.image.height}
                            />
                        </div>
                        <h4>{item.title}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}
