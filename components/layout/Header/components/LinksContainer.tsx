import { Exit } from "./Exit"
import { Links } from "./Links"
import { SwitchStatus } from "./SwitchStatus"
import { SearchDoctor } from "./SearchDoctor"
import { PayComponent } from "./PayComponent"

import styles from "./styles/links-container.module.scss"

export const LinksContainer = () => {
    return (
        <div className={styles.container}>
            <PayComponent />
            <SwitchStatus />
            <SearchDoctor />
            <Links />
            <Exit />
        </div>
    )
}
