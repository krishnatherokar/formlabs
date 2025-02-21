import { useState } from "react";
import QuestionBody from "../../components/form/QuestionBody";
import styles from "../../components/form/formbody.module.css";
import useFetch from "../../hooks/useFetch";

const CreateForm = () => {
  const [questionArr, setQuestionArr] = useState([]);
  const addNewQues = (component) => {
    setQuestionArr((prev) => [
      ...prev,
      { question: "", component: component, options: [] },
    ]);
  };

  const addNewOption = (index) => {
    let newArr = [...questionArr];
    newArr[index].options.push("");
    setQuestionArr(newArr);
  };

  const updateQuestion = (index, value) => {
    let newArr = [...questionArr];
    newArr[index].question = value;
    setQuestionArr(newArr);
  };

  const updateOptions = (index, optionIndex, value) => {
    let newArr = [...questionArr];
    newArr[index].options[optionIndex] = value;
    setQuestionArr(newArr);
  };

  const [url, setUrl] = useState(null);
  const {
    data: submitResponse,
    loading: submitLoading,
    error: submitError,
  } = useFetch(
    url,
    {
      body: JSON.stringify({ questions: questionArr }),
      withCredentials: true,
    },
    "POST"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`${import.meta.env.VITE_APP_API_URL}/form/create`);
  };

  return (
    <>
      {questionArr.map((questionObj, i) => {
        const props = {
          index: i,
          questionObj,
          updateQuestion,
          addNewOption,
          updateOptions,
        };

        return (
          <div className={styles.card} key={i}>
            <QuestionBody {...props} />
          </div>
        );
      })}
      <button onClick={(e) => addNewQues("multichoice")}>Add new</button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};
export default CreateForm;
