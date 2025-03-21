import { useContext, useEffect, useState } from "react";
import { MultiChoice, MultiSelect, TextAnswer } from "./questions";
import styles from "./formbody.module.css";
import useFetch from "../../hooks/useFetch";
import { changeLocalAns, deleteLocalAns } from "../../utils/handleLocalSync";
import { UserContext } from "../../context/UserContext";
import Error from "../error/Error";
import LoadingCard from "../loading/LoadingCard";
import FullScreen from "../containers/FullScreen";
import Card from "../containers/Card";
import LoginButton from "../button/LoginButton";
import { Navigate } from "react-router-dom";
import Avatar from "react-avatar";
import { motion } from "framer-motion";

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
    setAnswers((prevAnswers) => {
      const newArr = [...prevAnswers];
      newArr[i] = stringToAdd;
      return newArr;
    });
  };

  if (!answers) {
    localStorage.setItem(id, JSON.stringify(new Array(data.questions.length)));
    setAnswers(JSON.parse(localStorage.getItem(id)));
  }

  const [url, setUrl] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`${import.meta.env.VITE_APP_API_URL}/form/submit/${id}`);
  };

  const {
    data: submitResponse,
    loading: submitLoading,
    error: submitError,
  } = useFetch(url, { body: JSON.stringify({ answers }) }, "POST");

  useEffect(() => {
    if (answers) changeLocalAns(id, answers);
  }, [answers]);

  useEffect(() => {
    if (submitResponse) deleteLocalAns(id);
  }, [submitResponse]);

  const ListOfComponents = {
    textanswer: TextAnswer,
    multichoice: MultiChoice,
    multiselect: MultiSelect,
  };

  if (submitError)
    return (
      <FullScreen>
        <Error>{submitError}</Error>
      </FullScreen>
    );
  if (url && submitLoading)
    return (
      <FullScreen>
        <LoadingCard>Submitting Response...</LoadingCard>
      </FullScreen>
    );
  if (submitResponse) return <Navigate to={`/form/r/${submitResponse}`} />;

  return (
    <section className={styles.mainBody}>
      <div className={styles.userDetails}>
        {readonly ? <>Response submitted by</> : <>Form created by</>}
        <Avatar
          className={styles.profilePhoto}
          name={data.userInfo.name}
          round={true}
          size="20px"
        />
        {data.userInfo.name}
      </div>
      <div className={styles.detailsWrap}>
        <div className={styles.formDetails}>
          <span className={styles.title}>{data.title}</span>
          <div className={styles.description}>{data.description}</div>
        </div>
      </div>
      <div className={styles.formBody}>
        <form onSubmit={handleSubmit}>
          {data.questions.map((q, i) => {
            const Component = ListOfComponents[q.component];
            const props = {
              index: i,
              details: q,
              val: answers ? answers[i] : null,
              readonly,
              setAns,
            };
            return (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                key={i}
              >
                <Card nameOfClass={styles.card}>
                  <Component {...props} />
                </Card>
              </motion.div>
            );
          })}
          {readonly ? null : (
            <div className={styles.buttonFlex}>
              {isLogged ? null : <LoginButton />}
              <button type="submit" disabled={!isLogged}>
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
export default FormBody;
