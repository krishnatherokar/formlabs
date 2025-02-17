import { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";

const Register = ({ handleSubmit, handleChange, handleOAuth }) => {
  const emailRef = useRef(null);
  const [otpUrl, setOtpUrl] = useState(null);

  const { data } = useFetch(otpUrl, {
    withCredentials: true,
  });

  const sendOtp = () => {
    setOtpUrl(
      `${import.meta.env.VITE_APP_API_URL}/login/otp?email=${
        emailRef.current.value
      }`
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="email"
          ref={emailRef}
          required
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <input
          onChange={handleChange}
          type="number"
          name="otp"
          placeholder="otp"
          required
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={sendOtp}>Send Otp</button>

      <p>OR</p>
      <button onClick={handleOAuth}>Continue with Google</button>
    </>
  );
};
export default Register;
