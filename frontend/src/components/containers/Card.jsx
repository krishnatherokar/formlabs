import styles from "./card.module.css";

const Card = ({ children, nameOfClass }) => {
  return <div className={`${styles.card} ${nameOfClass}`}>{children}</div>;
};
export default Card;
