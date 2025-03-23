import { motion } from "framer-motion";
import styles from "./qrcontainer.module.css";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";

const QRcontainer = ({ setQrVisible }) => {
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const qrRef = useRef();

  useEffect(() => {
    if (qrRef.current) setQrDataUrl(qrRef.current.toDataURL("image/png"));
  }, []);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `QRCode${Date.now()}.png`;
    link.click();
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
          ref={qrRef}
        />
        <div className={styles.buttonFlex}>
          <button onClick={handleDownload}>Download</button>
          <button onClick={() => setQrVisible(false)}>Close</button>
        </div>
      </motion.div>
    </div>
  );
};
export default QRcontainer;
