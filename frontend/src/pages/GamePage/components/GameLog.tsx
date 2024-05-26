function GameLog(props) {



    return <div className="w-full h-full flex justify-center items-center">
        { !props.gameID && <button className="p-2 bg-green-500 rounded" onClick={props.initGame}>Start Game</button>}
    </div>
}   

export default GameLog