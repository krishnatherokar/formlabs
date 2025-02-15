import { useContext, useEffect, useState } from "react";
import { MultiChoice, MultiSelect, TextAnswer } from "../questions";
import styles from "./formbody.module.css";
import useFetch from "../../hooks/useFetch";
import useSubmit from "../../hooks/useSubmit";
import { changeLocalAns, deleteLocalAns } from "../../utils/handleLocalSync";
import { UserContext } from "../../context/userContext";

const FormBody = ({ data, ans, readonly, isLogged }) => {
  const id = data._id;
  const { setUser } = useContext(UserContext);
  const [answers, setAnswers] = useState(
    ans ? ans : (localStorage.getItem(id)? JSON.parse(localStorage.getItem(id)): null)
  );

  const setAns = (i, stringToAdd) => {
    let newArr = [...answers];
    newArr[i] = stringToAdd;
    setAnswers(newArr);
  };
  
  if (!answers) {
    localStorage.setItem(id, JSON.stringify(new Array(data.questions.length)));
    setAnswers(JSON.parse(localStorage.getItem(id)));
  }

  const { url, handleSubmit } = useSubmit(`/form/submit/${id}`);
  const {
    data: submitResponse,
    loading: submitLoading,
    error: submitError,
  } = useFetch(
    url,
    {
      body: JSON.stringify({ answers }),
      withCredentials: true,
    },
    "POST"
  );

  useEffect(() => {
    if (answers) changeLocalAns(id, answers);
  }, [answers]);

  useEffect(() => {
    if (submitResponse) {
      deleteLocalAns(id);
      setUser(submitResponse);
    }
  }, [submitResponse]);

  const ListOfComponents = {
    textanswer: TextAnswer,
    multichoice: MultiChoice,
    multiselect: MultiSelect,
  };

  if (submitError) return <div>{submitError}</div>;
  if (url && submitLoading) return <div>Loading...</div>;
  if (submitResponse) return <div>Response submitted</div>;

  return (
    <section>
      <h1>{data.title}</h1>
      <p>{data.description}</p>

      <form onSubmit={handleSubmit}>
        {data.questions.map((q, i) => {
          const Component = ListOfComponents[q.component];
          return (
            <Component
              key={i}
              index={i}
              details={q}
              val={answers ? answers[i] : null}
              readonly={readonly}
              setAns={setAns}
            />
          );
        })}
        {readonly ? null : (
          <button
            className={styles.submitButton}
            type="submit"
            disabled={!isLogged}
          >
            Submit
          </button>
        )}
      </form>
    </section>
  );
};
export default FormBody;
