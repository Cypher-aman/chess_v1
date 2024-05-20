import {WebSocket} from "ws"
import { v4 as uuid } from 'uuid';
import { Game } from "./game";
import { MESSAGES } from "./Messages";

class GameManager {
    private static instance: GameManager
    private games: Game[]
    private users: WebSocket[] 
    private pendingUser: WebSocket | null
    private constructor() {
        this.games = []
        this.users = []
        this.pendingUser = null
    }
    public static getInstance(): GameManager {
        if (!this.instance) {
            this.instance = new GameManager()
        }
        return this.instance
    }
    public addGame(game: Game): void {
        this.games.push(game)
    }
    public addUser(user: WebSocket): void {
        this.users.push(user)
        this.addHandler(user)
    }
    public removeUser(user: WebSocket): void {
        this.users = this.users.filter(u => u !== user)
        this.games = this.games.filter(g => g.player1 !== user && g.player2 !== user)
        // stop the game

        // send a message to the other player

        // declare other player as winner

        // close the game connection
    }
    public getUsers(): WebSocket[] {
        return this.users
    }

    private addHandler(user: WebSocket) {
        user.on("message", (data) => {
            // console.log(data.toString());

            const message = JSON.parse(data.toString())
            console.log({message});
            switch(message.type) {
                case (MESSAGES.INIT_GAME): {
                    if(this.pendingUser) {
                        const gameID = uuid()
                        console.log({gameID});
                        const game = new Game(this.pendingUser, user, gameID)
                        this.addGame(game)
                        this.pendingUser = null
                    } else {
                        this.pendingUser = user
                        console.log("pending user");
                    }
                    break
                }

                case (MESSAGES.GAME_MOVE): {
                    const game = this.games.find(g => g.gameID === message.gameID)

                    if(game) {
                        game.makeMove(user, message.move)
                    }
                    break
                }
            }
        })
    }
}

export const gameManager = GameManager.getInstance()