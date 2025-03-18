import { useEffect, useState } from "react";
import Card from "./Card";
import styles from "./deleteprompt.module.css";
import useFetch from "../../hooks/useFetch";
import Error from "../error/Error";
import LoadingCard from "../loading/LoadingCard";

const DeletePrompt = (props) => {
  const { message, endPoint, setPromptProps, callback } = props;
  const [url, setUrl] = useState(null);
  const { data, loading, error } = useFetch(url, {}, "DELETE");

  useEffect(() => {
    if (data) {
      callback ? callback() : null;
      setPromptProps(null);
    }
  }, [error, data, setPromptProps]);

  return (
    <div className={styles.promptContainer}>
      {error ? (
        <Error onClick={() => setPromptProps(null)}>{error}</Error>
      ) : url && loading ? (
        <LoadingCard>Deleting...</LoadingCard>
      ) : (
        <Card nameOfClass={styles.card}>
          <span className={styles.message}>{message}</span>
          <div className={styles.buttonContainer}>
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
          </div>
        </Card>
      )}
    </div>
  );
};
export default DeletePrompt;
