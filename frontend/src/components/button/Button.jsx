import styles from "./button.module.css";
import { Link } from "react-router-dom";

const Button = ({ path, content }) => {
  return (
    <Link className={styles.link} to={path}>
      {content}
    </Link>
  );
};

export default Button;
