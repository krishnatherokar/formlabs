import styles from "./fullscreen.module.css";

const FullScreen = ({ children }) => {
  return <div className={styles.fullscreen}>{children}</div>;
};
export default FullScreen;
