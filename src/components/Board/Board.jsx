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
  const [winner, setWinner] = useState(false);
  const [wintext, setWintext] = useState(" ");
  const firstRow = [
    board[0][0].player,
    board[0][1].player,
    board[0][2].player,
  ].toString();
  const secondRow = [
    board[1][0].player,
    board[1][1].player,
    board[1][2].player,
  ].toString();
  const thirdRow = [
    board[2][0].player,
    board[2][1].player,
    board[2][2].player,
  ].toString();

  const checkWin = () => {
    // Your code here
    console.log(firstRow);
    console.log(secondRow);
    console.log(thirdRow);
    if (firstRow === "X,X,X") {
      setWinner(true);
      setWintext("You Win");
    } else {
      console.log("nothing yet");
    }

    // firstRow == "X,X,X" ? setWinner(true) : console.log("nope");
    // secondRow == "X,X,X" ? setWinner(true) : console.log("not yet");
    // thirdRow == "X,X,X" ? setWinner(true) : console.log("nope");
    console.log(winner);
  };

  const play = (row, col) => {
    const temp = [...board];
    temp[row][col] = { player: move };
    setBoard(temp);
    checkWin();
    setMove(move === "X" ? "O" : "X");
  };

  const newGame = () => {
    setWinner(false);
    setWintext(" ");
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
      {wintext}
    </div>
  );
};
