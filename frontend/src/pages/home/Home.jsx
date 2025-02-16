import styles from "./home.module.css";
import Button from "../../components/button/Button";

const Home = () => {
  return (
    <>
      <div className={styles.title}>Home</div>
      <Button path={"/user"} content={"Profile"} />
      <Button path={"/form/67af54b90c20687dacd75f5e"} content={"Form id: 67af54b90c20687dacd75f5e"} />
    </>
  );
};

export default Home;
