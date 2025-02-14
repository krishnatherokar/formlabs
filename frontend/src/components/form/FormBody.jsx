import { useEffect, useState } from "react";
import { MultiChoice, MultiSelect, TextAnswer } from "../questions";
import styles from "./formbody.module.css";
import useFetch from "../../hooks/useFetch";
import useSubmit from "../../hooks/useSubmit";
import changeLocalAns from "../../utils/changeLocalAns";
import deleteLocalAns from "../../utils/deleteLocalAns";

const FormBody = ({ data, ans, readonly, isLogged }) => {
  const id = data._id;
  const [answers, setAnswers] = useState(
    ans.length > 0 ? ans : new Array(data.questions.length)
  );
  const setAns = (i, stringToAdd) => {
    let newArr = [...answers];
    newArr[i] = stringToAdd;
    setAnswers(newArr);
  };

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
    changeLocalAns(id, answers);
  }, [answers]);

  const ListOfComponents = {
    textanswer: TextAnswer,
    multichoice: MultiChoice,
    multiselect: MultiSelect,
  };

  if (submitError) return <div>{submitError}</div>;
  if (url && submitLoading) return <div>Loading...</div>;
  if (submitResponse) {
    deleteLocalAns(id);
    return <p>{JSON.stringify(submitResponse)}</p>;
  }

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
              val={answers[i]}
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
