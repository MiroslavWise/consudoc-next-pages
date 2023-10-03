import {
    type Dispatch,
    type FC,
    type ReactNode,
    type SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"

import { useAuth } from "@/store/state"
import { URL_SOCKET } from "@/services/general-api"

export const ContextWebSocket = createContext<{
    wsChannel: WebSocket | undefined
    setWsChannel: Dispatch<SetStateAction<WebSocket | undefined>>
}>({ wsChannel: undefined, setWsChannel: () => {} })

export const ProviderWebSocket: FC<{ children: ReactNode }> = ({ children }) => {
    const [webSocket, setWebSocket] = useState<WebSocket | undefined>(undefined)
    const { token } = useAuth()

    function connectWebSocket() {
        if (token) {
            console.log("URL_SOCKET(token!): ", URL_SOCKET(token!))
            const ws = new WebSocket(URL_SOCKET(token!))

            ws.addEventListener("open", () => {
                console.log("WebSocket connected")
                setWebSocket(ws)
            })

            ws.addEventListener("close", () => {
                console.log("WebSocket disconnected")
                setWebSocket(undefined)
                reconnectWebSocket()
            })

            return ws
        }
    }

    function reconnectWebSocket() {
        console.log("Reconnecting WebSocket in 1 second...")
        setTimeout(() => {
            connectWebSocket()
        }, 1000)
    }

    useEffect(() => {
        const ws = connectWebSocket()

        return () => {
            if (ws) {
                ws.close()
            }
            if (webSocket) {
                webSocket?.close()
                setWebSocket(undefined)
            }
        }
    }, [token])

    return (
        <ContextWebSocket.Provider
            value={{
                wsChannel: webSocket,
                setWsChannel: setWebSocket,
            }}
        >
            {children}
        </ContextWebSocket.Provider>
    )
}

export const useWeb = () => {
    const context = useContext(ContextWebSocket)

    if (context === undefined) {
        throw new Error("useWebSocket must be used within a WebSocket Provider")
    }

    return context
}
