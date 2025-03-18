import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./viewformresponses.module.css";
import { CardSkeleton } from "../../components/loading/FormSkeleton";
import Card from "../../components/containers/Card";
import Error from "../../components/error/Error";
import { MdOpenInNew } from "react-icons/md";
import Avatar from "react-avatar";

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
          <span className={styles.title}>{title}</span>
          <MdOpenInNew
            onClick={() => navigate(`/form/${id}`)}
            className={styles.openIcon}
          />
          <div className={styles.description}>{description}</div>
        </div>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.responseHeader}>Responses:</div>
        {content ? (
          content.length ? (
            content.map((response, i) => {
              return (
                <Card key={i}>
                  <MdOpenInNew
                    className={styles.openResponse}
                    onClick={() => openResponse(response._id)}
                  />
                  <Avatar
                    className={styles.userDp}
                    name={response.userInfo.name}
                    round={true}
                    size="30px"
                  />
                  <span className={styles.userName}>
                    {response.userInfo.name}
                  </span>
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
