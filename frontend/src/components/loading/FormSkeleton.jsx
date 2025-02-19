import styles from "./formskeleton.module.css";

const FormSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.title}></div>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
    </div>
  );
};

export default FormSkeleton;
