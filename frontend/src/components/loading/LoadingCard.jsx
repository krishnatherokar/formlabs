import styles from "./loadingcard.module.css";

const LoadingCard = ({ children }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}></div>
      {children}
    </div>
  );
};
export default LoadingCard;
