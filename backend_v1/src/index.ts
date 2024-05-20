import {WebSocketServer} from "ws"
import { gameManager } from "./gameManager"

const wss = new WebSocketServer({port: 8080})

wss.on("connection", (ws) => {
    gameManager.addUser(ws)

    ws.on("error", (err) => {
        console.log(err)
    })

    ws.on("close", () => {
        gameManager.removeUser(ws)
})

    ws.send("hello")
})