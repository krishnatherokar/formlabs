import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../context/UserContext";
import Login from "../../components/auth/Login";
import { useNavigate, useSearchParams } from "react-router-dom";
import Register from "../../components/auth/Register";
import GoogleButton from "../../components/button/GoogleButton";
import styles from "./auth.module.css";
import { AnimatePresence, motion } from "framer-motion";

const Auth = () => {
  const [url, setUrl] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({});
  const { data, loading, error } = useFetch(url, { body: credentials }, "POST");
  const [isLogin, setIsLogin] = useState(true);

  // to get the queries in the url
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/user";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(
      `${import.meta.env.VITE_APP_API_URL}${
        isLogin ? "/login" : "/login/newuser"
        // if login is true, set the path to /login else to login/newuser (register)
      }?time=${new Date().getTime()}`
      // time is added so that after encountering an error, when user clicks login or register again, the browser must send a new request
    );
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (data) setUser(data);
    if (user) navigate(redirectTo);
  }, [data, user, error]);

  const toggleLogin = () => {
    setUrl(null);
    setIsLogin(!isLogin);
  };

  const props = {
    handleSubmit,
    handleChange,
    error,
    url,
    toggleLogin,
    isPasswordVisible,
    togglePassword,
  };

  if (data) return null;
  return (
    <div className={styles.authContainer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ y: -20 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          {isLogin ? <Login {...props} /> : <Register {...props} />}
        </motion.div>
      </AnimatePresence>
      <div className={styles.orText}>
        <hr />
        <span>or</span>
      </div>
      <GoogleButton />
    </div>
  );
};
export default Auth;
