import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
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
              <MdCheckBox className={styles.checkedSvg} />
            ) : (
              <MdCheckBoxOutlineBlank className={styles.uncheckedSvg} />
            )}
            {option}
          </label>
        );
      })}
    </div>
  );
};

export default MultiSelect;
