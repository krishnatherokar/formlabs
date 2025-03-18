import GoogleButton from "../button/GoogleButton";
import styles from "./login.module.css";
import { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";

const Login = ({
  handleSubmit,
  handleChange,
  error,
  url,
  setUrl,
  isLogin,
  setIsLogin,
}) => {
  const emailRef = useRef(null);
  const [otpUrl, setOtpUrl] = useState(null);

  const { data, loading: otploading, error: otperror } = useFetch(otpUrl);

  const sendOtp = () => {
    setOtpUrl(
      `${import.meta.env.VITE_APP_API_URL}/login/otp?email=${
        emailRef.current.value
      }`
    );
  };

  const toggleLogin = () => {
    setUrl(null);
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.authContainer}>
      {isLogin ? (
        <>
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
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
              required
            />
            <div className={styles.otpFlex}>
              {otpUrl && otploading ? (
                <button type="button" className={styles.otpButton}>
                  <span className={styles.loader}></span>
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.otpButton}
                  onClick={sendOtp}
                >
                  OTP
                </button>
              )}
              <input
                onChange={handleChange}
                type="number"
                name="otp"
                placeholder="OTP"
                required
              />
            </div>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Name"
              required
            />
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            {otperror && <div className={styles.error}>{otperror}</div>}
            {error && <div className={styles.error}>{error}</div>}
            {!error && url ? (
              <button type="button" className={styles.loginButton}>
                <span className={styles.loader}></span>Register
              </button>
            ) : (
              <button type="submit" className={styles.loginButton}>
                Register
              </button>
            )}
          </form>
          Already a member?
          <span onClick={toggleLogin} className={styles.link}>
            Login
          </span>
        </>
      )}
      <div className={styles.orText}>- OR -</div>
      <GoogleButton />
    </div>
  );
};
export default Login;
