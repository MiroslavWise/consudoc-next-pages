import { isMobile } from "react-device-detect"

import {
    FiltersDoctor,
    HeaderMobileFilter,
    ModalFilters,
    ListDoctors,
} from "@/components/pages/doctors"

import styles from "./style.module.scss"
import layoutStyle from "./layout.module.scss"

export default function Doctors() {
    return isMobile ? (
        <div className={layoutStyle.wrapperMobile}>
            <HeaderMobileFilter />
            <div className={styles.wrapperMobile}>
                <ListDoctors />
            </div>
        </div>
    ) : (
        <div className={layoutStyle.wrapper}>
            <FiltersDoctor />
            <div className={styles.wrapper}>
                <ModalFilters />
                <ListDoctors />
            </div>
        </div>
    )
}
