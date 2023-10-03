import type { TLabelInfo } from "./types"

import { cx } from "@/lib/cx"
import { styleIsMobile } from "@/lib/styleIsMobile"

import styles from "./style.module.scss"

export const LabelInfo: TLabelInfo = ({ label, text }) => {
    return (
        <div className={cx(styles.containerLabelInfo, styles[styleIsMobile])}>
            <label>{label}</label>
            {text ? <p>{text}</p> : <i>Не заполнено</i>}
        </div>
    )
}
