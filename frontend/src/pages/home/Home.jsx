import styles from "./home.module.css";
import Button from "../../components/button/Button";

const Home = () => {
  return (
    <>
      <div className={styles.title}>Home</div>
      <Button path={"/user"} content={"Profile"} />
      <Button path={"/form/123"} content={"Form id: 123"} />
    </>
  );
};

export default Home;
