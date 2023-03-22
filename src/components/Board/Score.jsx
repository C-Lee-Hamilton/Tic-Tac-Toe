import "./Score.css";

export const ScoreBoard = (props) => {
  const { xScore, oScore } = props;
  return (
    <div className="score">
      <div style={{ textDecorationLine: "underline" }}>Score</div>
      <div className="innerscore">
        X : {xScore}
        <br />O : {oScore}
      </div>
    </div>
  );
};
