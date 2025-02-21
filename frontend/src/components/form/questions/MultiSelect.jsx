import { useEffect, useState } from "react";

const MultiSelect = ({ index, details, val, readonly, setAns }) => {
  const [selected, setSelected] = useState(val ? JSON.parse(val) : []);
  const handleChange = (e) => {
    const { value, checked } = e.target;
    setSelected((prev) => {
      const updated = checked
        ? [...prev, value]
        : prev.filter((element) => element != value);
      return updated;
    });
  };

  useEffect(() => {
    setAns(index, JSON.stringify(selected));
  }, [selected, index]);

  return (
    <div>
      {details.question}
      <br />
      {details.options.map((option, i) => {
        return (
          <label key={i}>
            <input
              type="checkbox"
              name="multiselect"
              onChange={handleChange}
              value={option}
              checked={selected.includes(option)}
              disabled={readonly}
            />
            {option}
          </label>
        );
      })}
    </div>
  );
};

export default MultiSelect;
