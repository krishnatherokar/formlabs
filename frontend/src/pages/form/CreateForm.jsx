import { useEffect, useState } from "react";
import QuestionBody from "../../components/form/QuestionBody";
import styles from "../../components/form/questionbody.module.css";
import formstyles from "../../components/form/formbody.module.css";
import useFetch from "../../hooks/useFetch";
import Error from "../../components/error/Error";
import Card from "../../components/containers/Card";
import LoadingCard from "../../components/loading/LoadingCard";
import FullScreen from "../../components/containers/FullScreen";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const [questionArr, setQuestionArr] = useState([]);
  const [quesDetails, setQuesDetails] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [key, setKey] = useState(0);
  const navigate = useNavigate();

  const addNewQues = (component) => {
    if (key == 10) {
      setError("Cannot add more than 10 questions");
    } else {
      setKey((prev) => prev + 1);
      setQuestionArr((prev) => [
        ...prev,
        { question: "", component: component, options: [] },
      ]);
    }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuesDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const [url, setUrl] = useState(null);
  const {
    data: submitResponse,
    loading: submitLoading,
    error: submitError,
  } = useFetch(
    url,
    { body: JSON.stringify({ ...quesDetails, questions: questionArr }) },
    "POST"
  );

  const options = [
    ["Text Answer", "textanswer"],
    ["Multiple Choice", "multichoice"],
    ["Checkbox", "multiselect"],
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`${import.meta.env.VITE_APP_API_URL}/form/create`);
  };

  useEffect(() => {
    if (submitResponse) {
      navigate(`/form/${submitResponse}`);
    }
  }, [submitResponse, navigate]);

  if (submitError)
    return (
      <FullScreen>
        <Error>{submitError}</Error>
      </FullScreen>
    );
  if (url && submitLoading)
    return (
      <FullScreen>
        <LoadingCard>Submitting Form...</LoadingCard>
      </FullScreen>
    );

  if (submitResponse) return null;

  return (
    <section className={formstyles.mainBody}>
      <div className={formstyles.detailsWrap}>
        <div className={formstyles.formDetails}>
          <input
            className={styles.titleInput}
            onChange={handleChange}
            name="title"
            placeholder="Title"
          />
          <input
            className={styles.descriptionInput}
            onChange={handleChange}
            name="description"
            placeholder="Description"
          />
        </div>
      </div>
      <div className={formstyles.formBody}>
        {questionArr.map((questionObj, i) => {
          const props = {
            index: i,
            size: questionArr.length,
            questionObj,
            updateQuestion,
            addNewOption,
            updateOptions,
          };

          return (
            <Card key={i}>
              <QuestionBody {...props} />
            </Card>
          );
        })}
        {error ? <Error>{error}</Error> : null}
        <button key={key} className={styles.addbutton}>
          <svg
            className={styles.addIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          Question
          <div
            className={`${styles.optionContainer} ${
              questionArr.length ? styles.top : styles.bottom
            }`}
          >
            {options.map((element, ei) => {
              return (
                <div
                  key={ei}
                  className={styles.choices}
                  onClick={(e) => addNewQues(element[1])}
                >
                  {element[0]}
                </div>
              );
            })}
          </div>
        </button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </section>
  );
};
export default CreateForm;
