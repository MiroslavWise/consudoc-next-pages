import type { TSignRegister } from "./types"

import { Header } from "./Header"
import { Footer } from "./Footer"

import styles from "./styles/sign.module.scss"
import styleInput from "./styles/style.module.scss"

export const Register: TSignRegister = ({}) => {
    return (
        <div className={styles.container}>
            <Header />
            <section>
                <div className={styleInput.blockInput}>
                    <label>
                        Имя и фамилия <sup>*</sup>
                    </label>
                    <input placeholder="Введите своё имя и фамилию" type="text" />
                </div>
                <div className={styleInput.blockInput}>
                    <label>
                        Email <sup>*</sup>
                    </label>
                    <input placeholder="Введите свой Email" type="email" />
                </div>
                <div className={styleInput.blockInput}>
                    <label>
                        Пароль <sup>*</sup>
                    </label>
                    <input placeholder="Введите свой пароль" type="password" />
                </div>
                <div className={styleInput.blockInput}>
                    <label>
                        Потвердите пароль <sup>*</sup>
                    </label>
                    <input placeholder="Введите свой пароль" type="password" />
                </div>
                <div className={styleInput.blockInput}>
                    <label>
                        Реферальный код <sup>*</sup>
                    </label>
                    <input
                        placeholder="Введите реферальный код, если он у вас есть"
                        type="text"
                    />
                </div>
                <div className={styleInput.buttonEnter}>
                    <span>Зарегистрироваться</span>
                </div>
            </section>
            <Footer />
        </div>
    )
}
