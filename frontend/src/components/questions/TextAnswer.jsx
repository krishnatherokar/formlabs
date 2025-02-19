const TextAnswer = ({ index, details, val, readonly, setAns }) => {
  return (
    <div>
      {details.question}
      <br />
      <input
        type="text"
        placeholder="Start writing here"
        onBlur={(e) => setAns(index, e.target.value)}
        defaultValue={val}
        disabled={readonly}
      />
    </div>
  );
};

export default TextAnswer;
