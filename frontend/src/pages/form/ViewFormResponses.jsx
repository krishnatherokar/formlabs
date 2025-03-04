import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./viewformresponses.module.css";
import { CardSkeleton } from "../../components/loading/FormSkeleton";
import Card from "../../components/containers/Card";
import Error from "../../components/error/Error";

const ViewFormResponses = () => {
  const [content, setContent] = useState(null);
  const [end, setEnd] = useState(false);
  const [skip, setSkip] = useState(0);
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/form/fr/${id}?toSkip=${skip}`
  );

  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const navigate = useNavigate();
  const openResponse = (id) => {
    navigate(`/form/r/${id}`);
  };

  const loaderRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && !error)
          setSkip((prev) => prev + 1);
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0.01,
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef, data]);

  useEffect(() => {
    if (data) {
      setContent((prev) => (prev ? [...prev, ...data] : data));
      if (data.length < 5) setEnd(true);
    }
  }, [data]);

  if (error) return <Error>{error}</Error>;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.infoWrap}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.responseHeader}>Responses:</div>
        {content ? (
          content.length ? (
            content.map((response, i) => {
              return (
                <Card key={i}>
                  <svg
                    className={styles.openResponse}
                    onClick={() => openResponse(response._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                  </svg>
                  <span className={styles.userName}>{response.userName}</span>
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
    </div>
  );
};
export default ViewFormResponses;
