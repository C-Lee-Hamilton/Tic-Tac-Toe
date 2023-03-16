export const Button = (props) => {
  const { text, xer } = props;
  return (
    <div>
      <button onClick={xer}>{text}</button>
    </div>
  );
};
