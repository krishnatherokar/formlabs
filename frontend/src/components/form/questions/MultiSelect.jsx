import styles from "./index.module.css";
import { useEffect, useState } from "react";

const MultiSelect = ({ index, details, val, readonly, setAns }) => {
  const [selected, setSelected] = useState(val ? JSON.parse(val) : []);
  const handleChange = (e, i) => {
    const { checked } = e.target;
    setSelected((prev) => {
      const updated = checked
        ? [...prev, i]
        : prev.filter((element) => element != i);
      return updated;
    });
  };

  useEffect(() => {
    setAns(index, JSON.stringify(selected));
  }, [selected, index]);

  return (
    <div>
      <div className={styles.question}>{details.question}</div>
      {details.options.map((option, i) => {
        const checked = selected.includes(i);
        return (
          <label className={styles.optionLabel} key={i}>
            <input
              className={styles.hiddenInput}
              type="checkbox"
              name="multiselect"
              onChange={(e) => handleChange(e, i)}
              value={option}
              checked={checked}
              disabled={readonly}
            />
            {checked ? (
              <svg
                className={styles.checkedSvg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
              >
                <path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
              </svg>
            ) : (
              <svg
                className={styles.uncheckedSvg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
              </svg>
            )}
            {option}
          </label>
        );
      })}
    </div>
  );
};

export default MultiSelect;
