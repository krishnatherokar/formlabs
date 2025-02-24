import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../context/UserContext";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";
import { useNavigate, useSearchParams } from "react-router-dom";

const Auth = ({ login }) => {
  const [url, setUrl] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({});
  const { data, loading, error } = useFetch(url, { body: credentials }, "POST");

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
        login ? "/login" : "/login/newuser"
        // if login is true, set the path to /login else to login/newuser (register)
      }`
    );
  };

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    if (user) {
      navigate(redirectTo);
    }
    if (error) {
      setUrl(null);
    }
  }, [data, user, error]);

  const props = { handleSubmit, handleChange, error, url };

  if (data) return null;

  return login ? <Login {...props} /> : <Register {...props} />;
};
export default Auth;
