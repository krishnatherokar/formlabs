import { useState } from "react";
import Card from "../containers/Card";
import styles from "./settings.module.css";
import DeletePrompt from "../containers/DeletePrompt";
import { MdLogout } from "react-icons/md";
import { LuChevronsDown, LuUserRoundPen, LuUserRoundX } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";

const Settings = ({ logOut, setSettingsVisible }) => {
  const [promptProps, setPromptProps] = useState(null);
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
        <button>
          <LuUserRoundPen /> Edit Name
        </button>
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
