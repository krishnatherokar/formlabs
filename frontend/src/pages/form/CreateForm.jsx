import { useEffect, useState } from "react";
import CreateFormBody from "../../components/form/CreateFormBody";
import styles from "../../components/form/createformbody.module.css";
import formstyles from "../../components/form/formbody.module.css";
import useFetch from "../../hooks/useFetch";
import Error from "../../components/error/Error";
import Card from "../../components/containers/Card";
import LoadingCard from "../../components/loading/LoadingCard";
import FullScreen from "../../components/containers/FullScreen";
import { useNavigate } from "react-router-dom";
import { MdAbc, MdCheckBox, MdRadioButtonChecked } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

const CreateForm = () => {
  const [questionArr, setQuestionArr] = useState([]);
  const [quesDetails, setQuesDetails] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [key, setKey] = useState(0);
  const navigate = useNavigate();

  const addNewQuestion = (component) => {
    if (key == 10) {
      setError("Cannot add more than 10 questions");
    } else {
      setKey((prev) => prev + 1);
      setQuestionArr((prev) => [
        ...prev,
        { question: "", component, options: [] },
      ]);
    }
  };

  const deleteQuestion = (index) => {
    setKey((prev) => prev - 1);
    setQuestionArr((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  const updateQuestion = (index, value) => {
    let newArr = [...questionArr];
    newArr[index].question = value;
    setQuestionArr(newArr);
  };

  const addNewOption = (index) => {
    let newArr = [...questionArr];
    newArr[index].options.push("");
    setQuestionArr(newArr);
  };

  const deleteOption = (index, optionIndex) => {
    let newArr = [...questionArr];
    newArr[index].options.splice(optionIndex, 1);
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
    ["Text", "textanswer", <MdAbc />],
    ["Multiple Choice", "multichoice", <MdRadioButtonChecked />],
    ["Checkbox", "multiselect", <MdCheckBox />],
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
        <div className={styles.formDetails}>
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
            placeholder="Enter the description"
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
            deleteQuestion,
            addNewOption,
            updateOptions,
            deleteOption,
          };

          return (
            <Card key={i}>
              <CreateFormBody {...props} />
            </Card>
          );
        })}
        {error ? <Error>{error}</Error> : null}
        <div className={formstyles.buttonFlex}>
          <button key={key} className={styles.addbutton}>
            <AiOutlineAppstoreAdd /> Add Section
            <div
              className={`${styles.optionContainer} ${
                questionArr.length ? styles.top : styles.bottom
              }`}
            >
              {options.map((element, ei) => {
                // element = [optionName, component]
                return (
                  <div
                    key={ei}
                    className={styles.choices}
                    onClick={(e) => addNewQuestion(element[1])}
                  >
                    {element[2]}
                    {element[0]}
                  </div>
                );
              })}
            </div>
          </button>
          <button onClick={handleSubmit}>Publish</button>
        </div>
      </div>
    </section>
  );
};
export default CreateForm;
