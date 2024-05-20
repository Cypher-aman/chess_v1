import {WebSocket} from "ws"
import {Chess} from "chess.js"
import { MESSAGES } from "./Messages"

type MOVE = {
    from: string
    to: string
}

export class Game {
    public player1: WebSocket
    public player2: WebSocket
    public gameID: string
    public board: Chess
    public gameStatus: string
    public timer: Date
    private moveCount: number

    public constructor(player1: WebSocket, player2: WebSocket, gameID: string) {
        this.player1 = player1
        this.player2 = player2
        this.gameID = gameID
        this.board = new Chess()
        this.gameStatus = ""
        this.moveCount = 0
        this.timer = new Date
        this.initGame()
    }

    private initGame() {
        this.player1.send(JSON.stringify({
            type: MESSAGES.INIT_GAME,
            gameID: this.gameID,
            color: "white"
        }))
        this.player2.send(JSON.stringify({
            type: MESSAGES.INIT_GAME,
            gameID: this.gameID,
            color: "black"
        }))
    }

    public makeMove(player: WebSocket, move: MOVE): void {
        // validate move
        if(this.moveCount % 2 === 0 && player !== this.player1) { 
            console.log("invalid move it's player 1's turn")
            this.player2.send(JSON.stringify({
                type: MESSAGES.INVALID_MOVE,
                gameID: this.gameID,
                message: "invalid move, it's not your turn"
            })) 
            return
        } else if(this.moveCount % 2 === 1 && player !== this.player2) {
            console.log("invalid move, it's player 2's turn")
            this.player1.send(JSON.stringify({
                type: MESSAGES.INVALID_MOVE,
                gameID: this.gameID,
                message: "invalid move, it's not your turn"
            }))
            return
        }

        // make move
        try {
            this.board.move(move)
            this.moveCount++
        } catch(err) {
            console.log(err)
            this.player1.send(JSON.stringify({
                type: MESSAGES.INVALID_MOVE,
                gameID: this.gameID,
                message: "invalid move"
            }))
            this.player2.send(JSON.stringify({
                type: MESSAGES.INVALID_MOVE,
                gameID: this.gameID,
                message: "invalid move"
            }))
            return
        }

        // check game status
        if(this.board.isCheckmate()) {
            this.gameStatus = "checkmate"
        } else if(this.board.isStalemate()) {
            this.gameStatus = "stalemate"
        } else if(this.board.isInsufficientMaterial()) {
            this.gameStatus = "insufficient_material"
        }

        // declare winner if game is over
        if(this.board.isGameOver()) { 
            this.gameStatus = "game_over" 

            this.player1.send(JSON.stringify({
                type: MESSAGES.GAME_END,
                gameID: this.gameID,
                winner: this.board.turn() === "w" ? "black" : "white"
            }))
            this.player2.send(JSON.stringify({
                type: MESSAGES.GAME_END,
                gameID: this.gameID,
                winner: this.board.turn() === "w" ? "white" : "black"
            }))
            return
        }
        // send move
        this.player1.send(JSON.stringify({
            type: MESSAGES.GAME_MOVE,
            gameID: this.gameID,
            move: move
        }))
        this.player2.send(JSON.stringify({
            type: MESSAGES.GAME_MOVE,
            gameID: this.gameID,
            move: move
        }))
    }
}