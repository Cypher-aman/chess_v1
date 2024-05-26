import { useEffect, useState } from 'react';
import King from "../../assets/chessPieces/king"
import Rook from '../../assets/chessPieces/Rook';
import Pawn from '../../assets/chessPieces/Pawn';
import Knight from '../../assets/chessPieces/Knight';
import Bishop from '../../assets/chessPieces/Bishop';
import Queen from '../../assets/chessPieces/Queen';

interface Move {
  from: string | null;
  to: string | null;
}

interface Cell {
  square: string;
  type: string;
  color: string;
}

function ChessBoard(props: any) {
  const [move, setMove] = useState<Move>({
    from: null,
    to: null,
  });

  useEffect(() => {
    if (move.from && move.to) {
      props.makeMove(move);
      setMove({
        from: null,
        to: null,
      });
      console.log(move);
    }
  }, [move]);

  const makeMove = (cords: string) => {
    console.log({ cords });
    if (!move.from) {
      setMove((prev) => {
        return {
          ...prev,
          from: cords,
        };
      });
    } else {
      setMove((prev) => {
        return {
          ...prev,
          to: cords,
        };
      });
    }
  };

  const renderColor = (color: string) => {
    return color === 'w' ? 'white' : 'black';
  };

  const renderPiece = (cell: Cell) => {
    if (!cell) return;

    switch (cell.type) {
      case 'k':
        return <King color={renderColor(cell.color)} />;
      case 'q':
        return <Queen color={renderColor(cell.color)} />;
      case 'n':
        return <Knight color={renderColor(cell.color)} />;
      case 'b':
        return <Bishop color={renderColor(cell.color)} />;
      case 'r':
        return <Rook color={renderColor(cell.color)} />;
      case 'p':
        return <Pawn color={renderColor(cell.color)} />;
    }
  };

  return (
    <div className="chess-board flex justify-center items-center h-full">
      <div className="grid grid-rows-8 w-full h-full aspect-square max-h-[700px] rounded">
        {props.board.map((row: Cell[], i: number) => (
          <div className="row-span-1 grid grid-cols-8" key={i}>
            {row.map((cell: Cell, j: number) => {
              const row = 8 - i;
              const col = String.fromCharCode(97 + j);
              const pos = col + row;
              console.log(cell);
              return (
                <div
                  className={`col-span-1 relative ${
                    (i + j) % 2 === 0 ? 'bg-[#EBEBD0]' : 'bg-[#779455]'
                  } after:content-[${col}] after:absolute after:top-1 after:left-2`}
                  key={j}
                >
                  <div
                    onClick={() => {
                      if (
                        (cell === null && move.from) ||
                        cell?.color === props.playerColor ||
                        (!move.to && move.from)
                      ) {
                        makeMove(pos);
                      }
                    }}
                    className={`w-full h-full flex justify-center items-center ${
                      cell?.color === 'w' ? 'text-red-400' : 'text-black'
                    }`}
                  >
                    <div>{renderPiece(cell)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChessBoard;
