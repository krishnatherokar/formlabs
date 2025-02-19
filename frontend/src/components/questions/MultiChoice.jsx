import { useState } from "react";

const MultiChoice = ({ index, details, val, readonly, setAns }) => {
  const [selected, setSelected] = useState(val);
  const handleChange = (e) => {
    const { value } = e.target;
    setSelected(value);
    setAns(index, value);
  };

  return (
    <div>
      {details.question}
      <br />
      {details.options.map((option, i) => {
        return (
          <label key={i}>
            <input
              type="radio"
              name="multichoice"
              onChange={handleChange}
              value={option}
              checked={selected == option}
              disabled={readonly}
            />
            {option}
          </label>
        );
      })}
    </div>
  );
};

export default MultiChoice;
