import styles from "./index.module.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

const Login = ({
  handleSubmit,
  handleChange,
  error,
  url,
  toggleLogin,
  isPasswordVisible,
  togglePassword,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -20 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            maxLength={40}
            placeholder="Email"
            required
          />
          <div className={styles.passwordWrap}>
            <input
              onChange={handleChange}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              minLength={6}
              maxLength={10}
              placeholder="Password"
              required
            />
            <div className={styles.passwordButton} onClick={togglePassword}>
              {isPasswordVisible ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          {!error && url ? (
            <button type="button" className={styles.loginButton}>
              <span className={styles.loader}></span>Login
            </button>
          ) : (
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          )}
        </form>
        Not a member?
        <span onClick={toggleLogin} className={styles.link}>
          Register
        </span>
      </motion.div>
    </AnimatePresence>
  );
};
export default Login;
