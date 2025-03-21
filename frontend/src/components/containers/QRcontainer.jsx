import { motion } from "framer-motion";
import styles from "./qrcontainer.module.css";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

const QRcontainer = ({ setQrVisible }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={styles.qrBody}>
      <motion.div
        className={styles.qrCard}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <QRCodeCanvas
          className={styles.qrWrapper}
          value={window.location.href}
          size={200}
          level={"H"}
        />
        <div className={styles.buttonFlex}>
          <button onClick={handleCopy}>
            {copied ? <>Copied</> : <>Copy URL</>}
          </button>
          <button
            className={styles.closeButton}
            onClick={() => setQrVisible(false)}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default QRcontainer;
