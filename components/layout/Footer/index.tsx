import Image from "next/image"
import styles from "./styles/style.module.scss"
import dayjs from "dayjs"

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div data-column>
                <div data-header>
                    <Image
                        src="/svg/logo_footer.svg"
                        alt="logo"
                        height={60}
                        width={200}
                        data-logo
                    />
                </div>
                <div data-items>
                    <a data-logo>
                        © {dayjs().format("YYYY")} • Компания ConsuDoc • Все права защищены
                    </a>
                </div>
            </div>
            <div data-column>
                <div data-header data-visa>
                    <a href="https://www.mastercard.kz/ru-kz.html" target="_blank">
                        <Image
                            src="/svg/mastercard.svg"
                            alt="mastercard"
                            width={60}
                            height={30}
                        />
                    </a>
                    <a href="https://www.visa.com.kz/" target="_blank">
                        <Image src="/svg/visa.svg" alt="visa" width={60} height={30} />
                    </a>
                </div>
                <div data-items data-visa>
                    <a>О нас</a>
                    <a>Контакты</a>
                    <a>Безопасность онлайн платежей</a>
                    <a>Пользователям</a>
                    <a>Правила пользования ресурсом</a>
                </div>
            </div>
            <div data-column>
                <div data-header data-kazinno>
                    <a href="https://qazinn.kz/ru" target="_blank">
                        <Image
                            src="/svg/kazinno.svg"
                            alt="logo"
                            height={60}
                            width={200}
                            data-logo
                        />
                    </a>
                </div>
                <a data-logo>При поддержке QazInnovations</a>
            </div>
            <div data-column>
                <div data-header data-play>
                    <a
                        href="https://apps.apple.com/app/consudoc-online/id6450400515"
                        target="_blank"
                    >
                        <Image
                            src="/svg/ios.svg"
                            alt="logo"
                            height={60}
                            width={200}
                            data-logo
                        />
                    </a>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.consudoc.online"
                        target="_blank"
                    >
                        <Image
                            src="/svg/android.svg"
                            alt="logo"
                            height={60}
                            width={200}
                            data-logo
                        />
                    </a>
                </div>
                <a>Мобильное приложение</a>
            </div>
        </footer>
    )
}
