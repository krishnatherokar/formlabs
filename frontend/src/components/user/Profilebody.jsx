import styles from "./profilebody.module.css";
import Card from "../containers/Card";
import ContentList from "./ContentList";

const Profilebody = ({ user, logOut }) => {
  return (
    <>
      <Card>
        <div>{user.name}</div>
        <div>{user.email}</div>
        <button onClick={logOut}>Log Out</button>
      </Card>
      <div className={styles.mainFlex}>
        <div>
          Your Forms:
          <ContentList contentType={"forms"} />
        </div>
        <div>
          Your Responses:
          <ContentList contentType={"responses"} />
        </div>
      </div>
    </>
  );
};
export default Profilebody;
