import styles from "./index.module.css";
import { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Register = ({
  handleSubmit,
  handleChange,
  error,
  url,
  toggleLogin,
  isPasswordVisible,
  togglePassword,
}) => {
  const emailRef = useRef(null);
  const [otpUrl, setOtpUrl] = useState(null);

  const { data, loading: otploading, error: otperror } = useFetch(otpUrl);

  const sendOtp = () => {
    setOtpUrl(
      `${import.meta.env.VITE_APP_API_URL}/login/otp?email=${
        emailRef.current.value
      }&time=${new Date().getTime()}`
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          maxLength={20}
          placeholder="Name"
          required
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          maxLength={40}
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
            min="1000"
            max="9999"
            placeholder="OTP"
            required
          />
        </div>

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
  );
};

export default Register;
