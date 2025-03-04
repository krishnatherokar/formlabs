import styles from "./profilebody.module.css";
import { CardSkeleton } from "../loading/FormSkeleton";
import Card from "../containers/Card";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Error from "../error/Error";
import DeletePrompt from "../containers/DeletePrompt";

const ContentList = ({ contentType }) => {
  const [content, setContent] = useState(null);
  const [end, setEnd] = useState(false);
  const [skip, setSkip] = useState(0);
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/user/${
      contentType == "forms" ? "sf" : "sr"
    }?toSkip=${skip}`
  );

  const openForm = (form) => {
    if (contentType == "forms") {
      window.open(
        `${import.meta.env.VITE_APP_BASE_URL}/form/fr/${form._id}?title=${
          form.title
        }&description=${form.description}`
      );
    } else {
      window.open(`${import.meta.env.VITE_APP_BASE_URL}/form/r/${form._id}`);
    }
  };

  const loaderRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && !error)
          setSkip((prev) => prev + 1);
      },
      {
        root: containerRef.current,
        rootMargin: "0px 200px 200px 0px",
        threshold: 0.01,
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef, data, end]);

  useEffect(() => {
    if (data) {
      setContent((prev) => (prev ? [...prev, ...data] : data));
      if (data.length < 10) setEnd(true);
    }
  }, [data]);

  const [promptProps, setPromptProps] = useState(null);
  const refreshList = () => {
    setContent(null);
    setSkip((val) => (val == 0 ? -1 : 0));
    setEnd(false);
  };

  if (error) return <Error>{error}</Error>;

  return (
    <>
      {promptProps && <DeletePrompt {...promptProps} callback={refreshList} />}
      <div ref={containerRef} className={styles.listContainer}>
        {content ? (
          content.length ? (
            content.map((form, i) => {
              return (
                <Card nameOfClass={styles.card} key={i}>
                  <span className={styles.title}>{form.title}</span>
                  <span className={styles.description}>{form.description}</span>
                  <svg
                    className={styles.openForm}
                    onClick={() => openForm(form)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                  </svg>
                  <svg
                    className={styles.deleteSvg}
                    onClick={() =>
                      setPromptProps({
                        form,
                        content: contentType,
                        setPromptProps,
                      })
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </Card>
              );
            })
          ) : (
            <Card nameOfClass={styles.card}>No Data</Card>
          )
        ) : (
          <>
            <CardSkeleton nameOfClass={styles.card} />
            <CardSkeleton nameOfClass={styles.card} />
            <CardSkeleton nameOfClass={styles.card} />
          </>
        )}
        {!end && <CardSkeleton ref={loaderRef} nameOfClass={styles.card} />}
      </div>
    </>
  );
};
export default ContentList;
