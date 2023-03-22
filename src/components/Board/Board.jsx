import { useEffect, useState } from "react";
import "./Board.css";
import { ScoreBoard } from "./Score";

export const Board = (props) => {
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => ({ player: null }))
    )
  );
  const [move, setMove] = useState("X");
  const [game, setGame] = useState(true);
  const [winner, setWinner] = useState(false);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [tieToggle, setTieToggle] = useState(false);
  const [tie, setTie] = useState(0);

  useEffect(() => {
    checkWin();
  }, [board]);

  useEffect(() => {
    winner && setGame(false);
    console.log("Winner ", winner);

    console.log(game);
    if (winner === "X") {
      setXScore(xScore + 1);
      setToggle(true);
    } else if (winner === "O") {
      setOScore(oScore + 1);
      setToggle(true);
    } else {
      //do nothing
    }
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

    //ties
    // console.log(board[0][1].game);
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
    setTie(tie + 1);
    console.log(tie);
    if (tie === 8) {
      setTieToggle(true);
    } else {
    }
  };

  const newGame = () => {
    console.log("New Game!");
    setWinner(false);
    setToggle(false);
    setTieToggle(false);
    setTie(0);
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
                onMouseDown={() => {
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
      {toggle && (
        <div className="popup">
          <h1>{winner}'s win!</h1>
          <button className="reset" onClick={newGame}>
            New Game
          </button>
        </div>
      )}
      {tieToggle && (
        <div className="popup">
          <h1>Tie!</h1>
          <button className="reset" onClick={newGame}>
            New Game
          </button>
        </div>
      )}
      <ScoreBoard xScore={xScore} oScore={oScore} />
    </div>
  );
};
