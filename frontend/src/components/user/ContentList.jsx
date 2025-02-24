import styles from "./profilebody.module.css";
import { CardSkeleton } from "../loading/FormSkeleton";
import Card from "../containers/Card";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Error from "../error/Error";
import { useNavigate } from "react-router-dom";

const ContentList = ({ contentType }) => {
  const [content, setContent] = useState(null);
  const [end, setEnd] = useState(false);
  const [skip, setSkip] = useState(0);
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/user/${
      contentType == "forms" ? "sf" : "sr"
    }?toSkip=${skip}`
  );

  const navigate = useNavigate();
  const openForm = (id) => {
    navigate(`/form/${contentType == "forms" ? "" : "r/"}${id}`);
  };

  const loaderRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && !error)
          setSkip((prev) => prev + 1);
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef, data]);

  useEffect(() => {
    if (data) {
      setContent((prev) => (prev ? [...prev, ...data] : data));
      if (!data.length) setEnd(true);
    }
  }, [data]);

  if (error) return <Error>{error}</Error>;

  return (
    <div className={styles.listContainer}>
      {content ? (
        content.length ? (
          content.map((form, i) => {
            return (
              <Card key={i}>
                <span className={styles.title}>{form.title}</span>
                <span className={styles.description}>{form.description}</span>
                <svg
                  className={styles.openForm}
                  onClick={() => openForm(form._id)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
                <svg
                  className={styles.deleteSvg}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </Card>
            );
          })
        ) : (
          <Card>No Data</Card>
        )
      ) : (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )}
      {end ? null : <CardSkeleton ref={loaderRef} />}
    </div>
  );
};
export default ContentList;
