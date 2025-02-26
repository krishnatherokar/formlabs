import { useEffect, useState } from "react";
import Card from "./Card";
import styles from "./deleteprompt.module.css";
import useFetch from "../../hooks/useFetch";
import Error from "../error/Error";
import LoadingCard from "../loading/LoadingCard";

const DeletePrompt = (props) => {
  const { form, content, setPromptProps, callback } = props;
  const message = `Are you sure you want to delete the ${
    content == "responses" ? "response to the " : ""
  }form "${form.title}"?`;

  const endPoint = `${import.meta.env.VITE_APP_API_URL}/form/delete/${
    content == "responses" ? "r/" : ""
  }${form._id}`;

  const [url, setUrl] = useState(null);
  const { data, loading, error } = useFetch(url, {}, "DELETE");

  useEffect(() => {
    if (error || data) {
      const t = data ? 0 : 2000;
      if (data) callback();
      const timer = setTimeout(() => {
        setPromptProps(null);
      }, t);

      return () => clearTimeout(timer);
    }
  }, [error, data, setPromptProps]);

  return (
    <div className={styles.promptContainer}>
      {error ? (
        <Error>{error}</Error>
      ) : url && loading ? (
        <LoadingCard>Deleting...</LoadingCard>
      ) : (
        <Card nameOfClass={styles.card}>
          <span className={styles.message}>{message}</span>
          <button
            className={styles.cancelButton}
            onClick={() => setPromptProps(null)}
          >
            Cancel
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => setUrl(endPoint)}
          >
            Delete
          </button>
        </Card>
      )}
    </div>
  );
};
export default DeletePrompt;
