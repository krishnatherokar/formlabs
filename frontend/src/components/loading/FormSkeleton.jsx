import { forwardRef } from "react";
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

export const CardSkeleton = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className={`${styles.skeleton} ${styles.card}`}
      {...props}
    ></div>
  );
});

export default FormSkeleton;
