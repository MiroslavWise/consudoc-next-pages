import { TLabelInput } from "./types/types"

import styles from "./styles/label-input.module.scss"

export const LabelInput: TLabelInput = ({ label, children }) => {
    return (
        <div className={styles.container}>
            <label>{label}</label>
            {children}
        </div>
    )
}