import { ItemLink } from "./components/ItemLink"

import { useProfile } from "@/store/state"
import { LinksDoctor, LinksPatient } from "./constants"

export const MenuMobile = () => {
    const { isDoctor } = useProfile()
    return (
        <footer>
            {isDoctor && LinksDoctor.map((item) => <ItemLink key={item.path} {...item} />)}
            {isDoctor === false &&
                LinksPatient.map((item) => <ItemLink key={item.path} {...item} />)}
        </footer>
    )
}
