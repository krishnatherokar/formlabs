import styles from "./profilebody.module.css";
import ContentList from "./ContentList";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";

const Profilebody = ({ user, logOut }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.mainBody}>
      <div className={styles.userInfo}>
        <div>
          <Avatar
            className={styles.profilePhoto}
            name={user.name}
            round={true}
          />
        </div>
        <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div className={styles.logoutButton} onClick={logOut}>
            Logout
          </div>
        </div>
      </div>
      <div className={styles.sideInfo}>
        <div className={styles.listWrapper}>
          <div
            onClick={() => navigate("/form")}
            className={styles.createButton}
          >
            Create Form
          </div>
          <div className={styles.listTitle}>Your Forms:</div>
          <ContentList contentType={"forms"} />
        </div>
        <div className={styles.listWrapper}>
          <div className={styles.listTitle}>Your Responses:</div>
          <ContentList contentType={"responses"} />
        </div>
      </div>
    </div>
  );
};
export default Profilebody;
