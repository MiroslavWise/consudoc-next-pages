import Image from "next/image"
import styles from "./styles/first-screen.module.scss"

export const FirstScreen = () => {
    return (
        <main className={styles.wrapper}>
            <div className={styles.left}>
                <h1>Добро пожаловать в ConsuDoc!</h1>
                <h5>Самый быстрый способ проконсультироваться с врачом</h5>
            </div>
            <div className={styles.right}>
                <Image
                    src="/png/start-picture.png"
                    alt="start-picture"
                    width={1054}
                    height={951}
                    unoptimized
                />
            </div>
        </main>
    )
}
