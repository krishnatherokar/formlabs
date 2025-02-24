import styles from "./questionbody.module.css";
import questionstyles from "./questions/index.module.css";

const QuestionBody = ({
  index,
  size,
  questionObj,
  updateQuestion,
  addNewOption,
  updateOptions,
}) => {
  const { question, component, options } = questionObj;
  return (
    <>
      <input
        className={styles.questionInput}
        autoFocus={index == size - 1}
        type="text"
        placeholder="Question"
        onChange={(e) => updateQuestion(index, e.target.value)}
        value={question}
      />
      {component == "textanswer" ? null : (
        <>
          {options.map((optionValue, i) => {
            return (
              <div className={styles.flex} key={i}>
                {component == "multichoice" ? (
                  <svg
                    className={questionstyles.uncheckedSvg}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                ) : (
                  <svg
                    className={questionstyles.uncheckedSvg}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
                  </svg>
                )}
                <input
                  className={styles.optionInput}
                  autoFocus={i == options.length - 1}
                  type="text"
                  placeholder="Option"
                  onChange={(e) => updateOptions(index, i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") addNewOption(index);
                  }}
                  value={optionValue}
                />
              </div>
            );
          })}
          <button
            className={styles.optionbutton}
            onClick={() => addNewOption(index)}
          >
            <svg
              className={styles.addIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
            Option
          </button>
        </>
      )}
    </>
  );
};

export default QuestionBody;
