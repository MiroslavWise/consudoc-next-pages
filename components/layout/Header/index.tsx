import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

import { Logo } from "./components/Logo"
import { LinksContainer } from "./components/LinksContainer"

export function Header() {
    return (
        <motion.header
            initial={{ top: isMobile ? -68 : -98 }}
            animate={{ top: 0 }}
            transition={{ duration: 1 }}
            exit={{ top: isMobile ? -68 : -98 }}
        >
            <Logo />
            <LinksContainer />
        </motion.header>
    )
}
