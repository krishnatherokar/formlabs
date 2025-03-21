import styles from "./profilebody.module.css";
import ContentList from "./ContentList";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { RiUserSettingsLine } from "react-icons/ri";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { useState } from "react";
import Settings from "./Settings";
import { AnimatePresence, motion } from "framer-motion";

const Profilebody = ({ user, logOut }) => {
  const navigate = useNavigate();
  const [settingsVisible, setSettingsVisible] = useState(false);

  const props = {
    logOut,
    setSettingsVisible,
  };

  return (
    <AnimatePresence>
      {settingsVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          transition={{ duration: 0.2 }}
          key={1}
        >
          <Settings {...props} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, y: -20 }}
          key={2}
        >
          <div className={styles.mainBody}>
            <div className={styles.userInfo}>
              <Avatar
                className={styles.profilePhoto}
                name={user.name}
                round={true}
                size="100px"
              />
              <div>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.email}>{user.email}</div>
                <button
                  className={styles.settingsButton}
                  onClick={() => setSettingsVisible(true)}
                >
                  <RiUserSettingsLine /> Settings
                </button>
              </div>
            </div>
            <div className={styles.sideInfo}>
              <div className={styles.listWrapper}>
                <div
                  onClick={() => navigate("/form")}
                  className={styles.createButton}
                >
                  <HiOutlineDocumentAdd />
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Profilebody;
