import { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Error from "../error/Error";
import styles from "./index.module.css";
import GoogleButton from "../button/GoogleButton";
import { useNavigate } from "react-router-dom";

const Register = ({ handleSubmit, handleChange, error, url }) => {
  const navigate = useNavigate();
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

  return (
    <div className={styles.authContainer}>
      <GoogleButton />
      <p>OR</p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <div className={styles.flexOtp}>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            ref={emailRef}
            required
          />
          {otpUrl && otploading ? (
            <button type="button" className={styles.loginButton}>
              <span className={styles.loader}></span>
            </button>
          ) : (
            <button
              type="button"
              className={styles.loginButton}
              onClick={sendOtp}
            >
              OTP
            </button>
          )}
        </div>
        {otperror ? <Error>{otperror}</Error> : null}
        <input
          onChange={handleChange}
          type="number"
          name="otp"
          placeholder="OTP"
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
            <span className={styles.loader}></span>Register
          </button>
        ) : (
          <button type="submit" className={styles.loginButton}>
            Register
          </button>
        )}
      </form>
      Already a member?
      <span onClick={() => navigate("/auth")} className={styles.link}>
        Login
      </span>
    </div>
  );
};
export default Register;
