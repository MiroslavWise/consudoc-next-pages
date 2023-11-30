import { usePush } from "@/hooks/usePath"

import styles from "./styles/block-buttons.module.scss"

export const BlockButtons = () => {
    const { handleReplace } = usePush()
    return (
        <div className={styles.container}>
            <a>Русский</a>
            <p onClick={() => handleReplace("?state=login")}>Вход</p>
            <div className={styles.buttonRegister} onClick={() => handleReplace("?state=registration")}>
                <p>Присоединиться</p>
            </div>
        </div>
    )
}
