import { useState } from "react";
import "./Board.css";

export const Board = (props) => {
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => ({ player: null }))
    )
  );
  const [move, setMove] = useState("X");
  const [game, setGame] = useState(true);

  const checkWin = () => {
    // Your code here
  };

  const play = (row, col) => {
    const temp = [...board];
    temp[row][col] = { player: move };
    setBoard(temp);
    checkWin();
    setMove(move === "X" ? "O" : "X");
  };

  const newGame = () => {
    setMove("X");
    setBoard(
      Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => ({ player: null }))
      )
    );
    setGame(game);
  };
  return (
    <div className="gameboard">
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex}>
            {row.map((square, sqIndex) => (
              <div
                onClick={() => {
                  game && !square.player && play(rowIndex, sqIndex);
                }}
                key={sqIndex}
                className="thebutton"
              >
                {square.player ? square.player : "\xa0"}
              </div>
            ))}
          </div>
        );
      })}
      <button onClick={newGame}>New</button>
    </div>
  );
};
