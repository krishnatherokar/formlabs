import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
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
          <label
            className={`${styles.optionLabel} ${
              checked ? styles.checked : readonly ? styles.disabled : ""
            }`}
            key={i}
          >
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
              <MdRadioButtonChecked className={styles.checkedSvg} />
            ) : (
              <MdRadioButtonUnchecked className={styles.uncheckedSvg} />
            )}
            {option}
          </label>
        );
      })}
    </div>
  );
};

export default MultiChoice;
