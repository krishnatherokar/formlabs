import {
  MdAdd,
  MdCheckBoxOutlineBlank,
  MdDeleteOutline,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";

import styles from "./createformbody.module.css";
import questionstyles from "./questions/index.module.css";

const CreateFormBody = ({
  index,
  size,
  questionObj,
  updateQuestion,
  deleteQuestion,
  addNewOption,
  updateOptions,
  deleteOption,
}) => {
  const { question, component, options } = questionObj;
  return (
    <>
      <div className={styles.flex}>
        <input
          className={styles.questionInput}
          autoFocus={index == size - 1}
          type="text"
          placeholder="Question"
          onChange={(e) => updateQuestion(index, e.target.value)}
          value={question}
        />
        <MdDeleteOutline
          onClick={() => deleteQuestion(index)}
          className={styles.deleteSvg}
        />
      </div>
      {component == "textanswer" ? null : (
        <>
          {options.map((optionValue, i) => {
            return (
              <div className={styles.flex} key={i}>
                {component == "multichoice" ? (
                  <MdRadioButtonUnchecked
                    className={questionstyles.uncheckedSvg}
                  />
                ) : (
                  <MdCheckBoxOutlineBlank
                    className={questionstyles.uncheckedSvg}
                  />
                )}
                <input
                  className={styles.optionInput}
                  autoFocus={i == options.length - 1}
                  type="text"
                  placeholder="Option"
                  onChange={(e) => updateOptions(index, i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") addNewOption(index);
                    if (optionValue == "" && e.key == "Backspace")
                      deleteOption(index, i);
                  }}
                  value={optionValue}
                />
                <RxCross1 onClick={() => deleteOption(index, i)} />
              </div>
            );
          })}
          <button
            className={styles.optionbutton}
            onClick={() => addNewOption(index)}
          >
            <MdAdd className={styles.addIcon} />
            Option
          </button>
        </>
      )}
    </>
  );
};

export default CreateFormBody;
