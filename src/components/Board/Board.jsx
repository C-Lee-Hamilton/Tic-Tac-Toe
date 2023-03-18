import { useEffect, useState } from "react";
import "./Board.css";

export const Board = (props) => {
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => ({ player: null }))
    )
  );
  const [move, setMove] = useState("X");
  const [game, setGame] = useState(true);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    checkWin();
  }, [board]);

  useEffect(() => {
    winner && setGame(false);
    console.log("Winner ", winner);
  }, [winner]);

  const checkWin = () => {
    // Your code here

    //rows
    board.forEach((row) => {
      row[0].player &&
        row[0].player === row[1].player &&
        row[0].player === row[2].player &&
        setWinner(row[0].player);
    });

    //cols
    for (let i = 0; i < 3; i++) {
      board[0][i].player &&
        board[0][i].player === board[1][i].player &&
        board[0][i].player === board[2][i].player &&
        setWinner(board[0][i].player);
    }

    //cross
    board[0][0].player &&
      board[0][0].player === board[1][1].player &&
      board[0][0].player === board[2][2].player &&
      setWinner(board[0][0].player);

    board[0][2].player &&
      board[0][2].player === board[1][1].player &&
      board[0][2].player === board[2][0].player &&
      setWinner(board[0][2].player);
  };

  const play = (row, col) => {
    const temp = [...board];
    temp[row][col] = { player: move };
    setBoard(temp);
    setMove(move === "X" ? "O" : "X");
  };

  const newGame = () => {
    console.log("New Game!");
    setWinner(false);

    setMove("X");
    setBoard(
      Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => ({ player: null }))
      )
    );
    setGame(true);
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
