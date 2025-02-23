import styles from "./profilebody.module.css";
import { CardSkeleton } from "../loading/FormSkeleton";
import Card from "../containers/Card";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Error from "../error/Error";

const ContentList = ({ contentType }) => {
  const [content, setContent] = useState(null);
  const [end, setEnd] = useState(false);
  const [skip, setSkip] = useState(0);
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/user/${
      contentType == "forms" ? "sf" : "sr"
    }?toSkip=${skip}`
  );

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
    <div className={styles.flex}>
      {content ? (
        content.length ? (
          content.map((form, i) => {
            return <Card key={i}>{form.title}</Card>;
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
      {end ? <></> : <div ref={loaderRef}>Loader</div>}
    </div>
  );
};
export default ContentList;
