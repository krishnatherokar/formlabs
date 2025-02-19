import { useContext, useEffect, useState } from "react";
import { MultiChoice, MultiSelect, TextAnswer } from "../questions";
import styles from "./formbody.module.css";
import useFetch from "../../hooks/useFetch";
import useSubmit from "../../hooks/useSubmit";
import { changeLocalAns, deleteLocalAns } from "../../utils/handleLocalSync";
import { UserContext } from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import Error from "../error/Error";
import LoadingCard from "../loading/LoadingCard";

const FormBody = ({ data, ans, readonly, isLogged }) => {
  const id = data._id;
  const { setUser } = useContext(UserContext);
  const [answers, setAnswers] = useState(
    ans
      ? ans
      : localStorage.getItem(id)
      ? JSON.parse(localStorage.getItem(id))
      : null
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

  const location = useLocation();
  const navigate = useNavigate();

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

  const redirectToLogin = () => {
    navigate(`/auth?redirectTo=${location.pathname}`);
  };

  if (submitError) return <Error>{submitError}</Error>;
  if (url && submitLoading)
    return <LoadingCard>Submitting Response...</LoadingCard>;
  if (submitResponse) return null;

  return (
    <section>
      <h1>{data.title}</h1>
      <p>{data.description}</p>

      <form onSubmit={handleSubmit} className={styles.formbody}>
        {data.questions.map((q, i) => {
          const Component = ListOfComponents[q.component];
          return (
            <div className={styles.card} key={i}>
              <Component
                index={i}
                details={q}
                val={answers ? answers[i] : null}
                readonly={readonly}
                setAns={setAns}
              />
            </div>
          );
        })}
        {readonly ? null : (
          <>
            {isLogged ? null : (
              <button type="button" onClick={redirectToLogin}>
                Login
              </button>
            )}
            <button type="submit" disabled={!isLogged}>
              Submit
            </button>
          </>
        )}
      </form>
    </section>
  );
};
export default FormBody;
