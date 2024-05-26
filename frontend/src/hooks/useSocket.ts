import { useEffect, useState } from 'react'

export const useSocket = (url: string) => {
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        const newSocket = new WebSocket(url)

        newSocket.onopen = () => {
            setSocket(newSocket)
        }

        newSocket.onclose = () => {
            setSocket(null)
        }

        newSocket.onerror = () => {
            setSocket(null)
        }
        return () => newSocket.close()
    }, [url])

    return socket
}