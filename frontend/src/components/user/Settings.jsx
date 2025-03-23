import { useContext, useEffect, useState } from "react";
import Card from "../containers/Card";
import styles from "./settings.module.css";
import DeletePrompt from "../containers/DeletePrompt";
import { MdLogout } from "react-icons/md";
import { LuChevronsDown, LuUserRoundPen, LuUserRoundX } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { UserContext } from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";

const Settings = ({ logOut, setSettingsVisible }) => {
  const [promptProps, setPromptProps] = useState(null);
  const [inputVisible, setInputVisible] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState({ name: user ? user.name : "" });

  const [url, setUrl] = useState(null);
  const {
    data: response,
    loading,
    error,
  } = useFetch(url, { body: JSON.stringify(userData) }, "POST");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(
      `${
        import.meta.env.VITE_APP_API_URL
      }/user/edit?time=${new Date().getTime()}`
    );
  };

  useEffect(() => {
    if (response) {
      setInputVisible(false);
      setUser(response);
    }
  }, [response]);

  return (
    <>
      <AnimatePresence>
        {promptProps && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <DeletePrompt {...promptProps} />
          </motion.div>
        )}
      </AnimatePresence>
      <Card nameOfClass={styles.container}>
        <RxCross1
          className={styles.backSvg}
          onClick={() => setSettingsVisible(false)}
        />
        {inputVisible ? (
          <div className={styles.inputHolder}>
            <LuUserRoundPen />{" "}
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                className={styles.nameInput}
                type="text"
                name="name"
                value={userData.name}
                onChange={(e) => handleChange(e)}
                autoFocus={true}
              />
            </form>
            <div className={styles.infoText}>
              {url && loading ? (
                <>Saving...</>
              ) : error ? (
                <>Error! Try again.</>
              ) : (
                <>Press enter to save</>
              )}
            </div>
          </div>
        ) : (
          <button onClick={() => setInputVisible(true)}>
            <LuUserRoundPen /> Edit Name
          </button>
        )}
        <button className={styles.deleteButton} onClick={logOut}>
          <MdLogout /> Logout
        </button>
      </Card>
      <div className={styles.warningText}>
        <LuChevronsDown /> Danger Zone
      </div>
      <Card nameOfClass={styles.container}>
        <button
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
          <LuUserRoundX /> Delete Account
        </button>
      </Card>
    </>
  );
};
export default Settings;
