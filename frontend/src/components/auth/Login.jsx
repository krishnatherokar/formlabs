import { useNavigate } from "react-router-dom";
import GoogleButton from "../button/GoogleButton";
import Error from "../error/Error";
import styles from "./index.module.css";

const Login = ({ handleSubmit, handleChange, error, url }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.authContainer}>
      <GoogleButton />
      <p>OR</p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        {error ? <Error>{error}</Error> : null}
        {url ? (
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
      <span onClick={() => navigate("register")} className={styles.link}>
        Register
      </span>
    </div>
  );
};
export default Login;
