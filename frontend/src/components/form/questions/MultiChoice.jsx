import styles from "./index.module.css";
import { useState } from "react";

const MultiChoice = ({ index, details, val, readonly, setAns }) => {
  const [selected, setSelected] = useState(val);
  const handleChange = (i) => {
    setSelected(i);
    setAns(index, i);
  };

  return (
    <div>
      <div className={styles.question}>{details.question}</div>
      {details.options.map((option, i) => {
        const checked = selected == i;
        return (
          <label className={styles.optionLabel} key={i}>
            <input
              className={styles.hiddenInput}
              type="radio"
              name="multichoice"
              onChange={() => handleChange(i)}
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
                <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            ) : (
              <svg
                className={styles.uncheckedSvg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
              >
                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            )}
            {option}
          </label>
        );
      })}
    </div>
  );
};

export default MultiChoice;
