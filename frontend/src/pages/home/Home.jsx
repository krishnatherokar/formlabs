import useFetch from "../../hooks/useFetch";
import { CardSkeleton } from "../../components/loading/FormSkeleton";
import styles from "./home.module.css";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/form`
  );

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <div className={styles.formListContainer}>
          Recent Forms:
          <CardSkeleton />
        </div>
      ) : data && !data.empty ? (
        <div className={styles.formListContainer}>
          Recent Forms:
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
                  <span className={styles.username}>{form.userInfo.name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : null}
      <div className={styles.footer}>
        <a href="https://github.com/krishnatherokar/formlabs">
          <FaGithub />
          GitHub
        </a>
      </div>
    </>
  );
};
export default Home;
