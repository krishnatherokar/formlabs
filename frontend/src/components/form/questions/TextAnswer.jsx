import styles from "./index.module.css";

const TextAnswer = ({ index, details, val, readonly, setAns }) => {
  return (
    <div>
      <div className={styles.question}>{details.question}</div>
      <input
        type="text"
        placeholder="Write here"
        onBlur={(e) => setAns(index, e.target.value)}
        defaultValue={val}
        disabled={readonly}
      />
    </div>
  );
};

export default TextAnswer;
