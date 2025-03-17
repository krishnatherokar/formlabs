import { MdOutlineError } from "react-icons/md";
import styles from "./error.module.css";

const Error = ({ children }) => {
  return (
    <div className={styles.errorContainer}>
      <MdOutlineError className={styles.errorSvg} />
      {children}
    </div>
  );
};
export default Error;
