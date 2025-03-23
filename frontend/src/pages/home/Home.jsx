import useFetch from "../../hooks/useFetch";
import { CardSkeleton } from "../../components/loading/FormSkeleton";
import styles from "./home.module.css";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { easeInOut, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LuChevronsDown, LuLaptopMinimal } from "react-icons/lu";
import { MdOutlineQrCodeScanner, MdSecurity } from "react-icons/md";
import { RiOpenSourceLine } from "react-icons/ri";

const Home = () => {
  const [tryCount, setTryCount] = useState(0);
  const [url, setUrl] = useState(null);
  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    // it will try to fetch the recent forms 2 times
    if (tryCount == 0 || (error && tryCount < 3)) {
      setTryCount((prev) => prev + 1);
      setUrl(`${import.meta.env.VITE_APP_API_URL}/form?time=${Date.now()}`);
    }
  }, [error]);

  const features = [
    [
      <LuLaptopMinimal />,
      "Minimalist UI",
      "A clean and simple interface designed for effortless productivity.",
    ],
    [
      <RiOpenSourceLine />,
      "Open Source",
      "FormLabs is open-source, ensuring transparency and reliability.",
    ],
    [
      <MdOutlineQrCodeScanner />,
      "Easy Sharing",
      "Seamlessly share forms with QR codes for quick access.",
    ],
    [
      <MdSecurity />,
      "Privacy",
      "Your email stays private, with the option to delete your account anytime.",
    ],
  ];

  const navigate = useNavigate();

  return (
    <div className={styles.rootSection}>
      <div className={styles.frontSection}>
        <div className={styles.frontSectionText}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [-10, 10, 0] }}
            transition={{ duration: 0.8, ease: easeInOut }}
            className={styles.heading}
          >
            FormLabs
          </motion.div>

          <div className={styles.headDescription}>
            A platform where users can create and share their own forms.
          </div>
          <a className={styles.githubButton} href="https://github.com/krishnatherokar/formlabs">
              <FaGithub />
              GitHub
            </a>
          <button
            className={styles.startButton}
            onClick={() => navigate("/auth")}
          >
            Get Started <FaArrowRight />
          </button>
        </div>
        <motion.div
          animate={{ y: [0, -10, 10, 0, 0, 0, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: easeInOut }}
          className={styles.downIcon}
        >
          <LuChevronsDown />
        </motion.div>
      </div>
      {loading ? (
        <>
          <div className={styles.sectionHeading}>Recent Forms:</div>
          <CardSkeleton />
        </>
      ) : data && !data.empty ? (
        <>
          <div className={styles.sectionHeading}>Recent Forms:</div>
          <div className={styles.formListContainer}>
            {data.map((form, i) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.4 }}
                  key={i}
                >
                  <div
                    onClick={() => navigate(`/form/${form._id}`)}
                    className={styles.card}
                  >
                    <div className={styles.title}>{form.title}</div>
                    <div className={styles.description}>{form.description}</div>
                    <Avatar
                      className={styles.avatar}
                      name={form.userInfo.name}
                      size={24}
                      round={true}
                    />
                    <span className={styles.username}>
                      {form.userInfo.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      ) : null}
      <div className={styles.sectionHeading}>Why FormLabs?</div>
      <div className={styles.featureSection}>
        {features.map((feature, i) => {
          return (
            <motion.div
              className={styles.featureItems}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.4 }}
              key={i}
            >
              <div>{feature[0]}</div>
              <div className={styles.featureTitle}>{feature[1]}</div>
              <div className={styles.featureDescription}>{feature[2]}</div>
            </motion.div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <div>Sign up today!</div>
        <button
          className={styles.startButton}
          onClick={() => navigate("/auth")}
        >
          Get Started <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
export default Home;
