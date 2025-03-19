import { useCallback } from "react";
import styles from "./index.module.css";
import debounce from "lodash.debounce";

const TextAnswer = ({ index, details, val, readonly, setAns }) => {
  const saveChange = useCallback(
    debounce((value) => {
      setAns(index, value);
    }, 500),
    []
  );
  const handleChange = (e) => {
    const { value } = e.target;
    saveChange(value);
  };

  return (
    <div>
      <div className={styles.question}>{details.question}</div>
      {readonly ? (
        val
      ) : (
        <input
          type="text"
          placeholder="Write here"
          onChange={handleChange}
          defaultValue={val}
        />
      )}
    </div>
  );
};

export default TextAnswer;
