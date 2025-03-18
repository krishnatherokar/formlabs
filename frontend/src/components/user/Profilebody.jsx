import styles from "./profilebody.module.css";
import ContentList from "./ContentList";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import DeletePrompt from "../containers/DeletePrompt";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

const Profilebody = ({ user, logOut }) => {
  const [promptProps, setPromptProps] = useState(null);
  const navigate = useNavigate();
  return (
    <div className={styles.mainBody}>
      {promptProps && <DeletePrompt {...promptProps} />}
      <div className={styles.userInfo}>
        <Avatar
          className={styles.profilePhoto}
          name={user.name}
          round={true}
          size="100px"
        />
        <div>
          <MdOutlineEdit className={styles.editIcon} />
          <div className={styles.userName}>{user.name}</div>
          <div className={styles.email}>{user.email}</div>
          <div className={styles.logoutButton} onClick={logOut}>
            Logout
          </div>
          <div
            className={styles.deleteButton}
            onClick={() =>
              setPromptProps({
                message:
                  "Are you sure you want to delete your account? This action is irreversible.",
                endPoint: `${import.meta.env.VITE_APP_API_URL}/user/delete`,
                setPromptProps,
                callback: logOut,
              })
            }
          >
            Delete Account
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
