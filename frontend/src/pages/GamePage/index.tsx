import { useSocket } from '../../hooks/useSocket';
import { Chess } from 'chess.js';
import { useEffect, useState } from 'react';
import { MESSAGES } from '../../utils/constant';
import ChessBoard from '../../components/ChessBoard/ChessBoard';
import GameLog from './components/GameLog';

function Game() {
  const socket = useSocket(import.meta.env.VITE_SOCKET_URL);

  const [chess, setChess] = useState<Chess | null>(new Chess());
  const [board, setBoard] = useState<string[] | null>(
    chess?.board() as unknown as string[] | null
  );
  const [gameID, setGameId] = useState<string>('');
  const [playerColor, setPlayerColor] = useState<string>('');
  const [playerTurn, setPlayerTurn] = useState<string>('');

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event: WebSocketEventMap['message']) => {
      const message = JSON.parse(event.data.toString());
      switch (message.type) {
        case MESSAGES.GAME_START: {
          setGameId(message.gameID);
          setPlayerColor(message.color === 'white' ? 'w' : 'b');
          setPlayerTurn('w');
          break;
        }
        case MESSAGES.GAME_MOVE: {
          const move = chess?.move(message.move);
          setBoard(chess?.board() as unknown as string[] | null);
          setPlayerTurn(prev => prev === 'w' ? 'b' : 'w');
          break;
        }
        case MESSAGES.GAME_END: {
          setPlayerTurn('');
          alert("Game Over!" + ", winner is " + message.winner);
          break;
        }
      }
    };
  }, [socket]);
  console.log({playerColor, playerTurn})

  const makeMove = (move) => {
    if (!chess) return;
    if(playerTurn !== playerColor) return;
    try {
        
        const m = chess.move(move);
        if (m) {
          setBoard(chess.board() as unknown as string[] | null);
          socket?.send(JSON.stringify({ type: MESSAGES.GAME_MOVE, gameID: gameID, move }));
          setPlayerTurn(prev => prev === 'w' ? 'b' : 'w');
        }
    } catch (error) {
        console.log(error)
        alert('invalid move')
    }
  };

  const initGame = () => {
    socket?.send(JSON.stringify({ type: MESSAGES.INIT_GAME }));
  };

  return (
    <div className=' w-screen h-screen bg-[#302E2B] '>
        <div className='max-w-[1200px] h-full gap-10 p-5 mx-auto grid grid-cols-10 align-middle'>
      <div className='col-span-7 '><ChessBoard playerColor={playerColor}  board={board} makeMove={makeMove} /></div>
      <div className='col-span-3 bg-purple-200'><GameLog gameID={gameID} initGame={initGame} /></div></div>
    </div>
  );
}

export default Game;
