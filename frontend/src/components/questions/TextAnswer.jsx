const TextAnswer = ({ index, details, val, readonly, setAns }) => {
  return (
    <div>
      {details.question}
      <input
        type="text"
        onBlur={(e) => setAns(index, e.target.value)}
        defaultValue={val}
        readOnly={readonly}
      />
    </div>
  );
};

export default TextAnswer;
