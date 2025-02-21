const QuestionBody = ({
  index,
  questionObj,
  updateQuestion,
  addNewOption,
  updateOptions,
}) => {
  const { question, component, options } = questionObj;
  return (
    <div>
      <input
        type="text"
        placeholder="Start writing the question here"
        onChange={(e) => updateQuestion(index, e.target.value)}
        value={question}
      />
      <br />
      {component == "textanswer" ? null : (
        <>
          {options.map((optionValue, i) => {
            return (
              <input
                key={i}
                type="text"
                placeholder="Write the options"
                onChange={(e) => updateOptions(index, i, e.target.value)}
                value={optionValue}
              />
            );
          })}
          <button onClick={(e) => addNewOption(index)}>Add new option</button>
        </>
      )}
    </div>
  );
};

export default QuestionBody;
