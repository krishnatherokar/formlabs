import { useEffect, useState } from "react";
import CreateFormSection from "../../components/form/CreateFormSection";
import styles from "../../components/form/createformsection.module.css";
import formstyles from "../../components/form/formbody.module.css";
import useFetch from "../../hooks/useFetch";
import Error from "../../components/error/Error";
import Card from "../../components/containers/Card";
import LoadingCard from "../../components/loading/LoadingCard";
import FullScreen from "../../components/containers/FullScreen";
import { useNavigate } from "react-router-dom";
import { MdAbc, MdCheckBox, MdRadioButtonChecked } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

const CreateForm = () => {
  const [questionArr, setQuestionArr] = useState([]);
  const [quesDetails, setQuesDetails] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [key, setKey] = useState(0);
  // this key is for the "Add Section" button for:
  // 1. tracking the number of sections added
  // 2. each time a question is added, the button is refreshed which removes the hover or active state

  const [uniqueKeys, setUniqueKeys] = useState([]);
  const [counter, setCounter] = useState(0);
  // the problem with key = {i} is that when a section is removed, the keys are shifted, which confuses the framer motion
  // the uniquekeys array stores the indices, when a section is removed, it removes that index and keeps all the other as it is

  const generateUniqueKey = () => {
    setUniqueKeys((prevKeys) => [...prevKeys, counter]);
    setCounter((prev) => prev + 1);
  };

  const deleteUniqueKey = (index) => {
    setUniqueKeys((prevKeys) => prevKeys.filter((key, i) => i !== index));
  };

  const addNewQuestion = (component) => {
    generateUniqueKey();
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
    deleteUniqueKey(index);
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
            className={styles.descriptionInput}
            onChange={handleChange}
            name="title"
            placeholder="Enter the title"
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
        <AnimatePresence>
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
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.4 }}
                key={uniqueKeys[i]}
              >
                <Card>
                  <CreateFormSection {...props} />
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
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
