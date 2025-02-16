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
  const { data, loading, error } = useFetch(
    url,
    {
      body: credentials,
      withCredentials: true,
    },
    "POST"
  );

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

  const handleOAuth = () => {
    window.location.href = `${
      import.meta.env.VITE_APP_API_URL
    }/login/google?redirectTo=${redirectTo}`;
    // the url has redirectTo query to indicate where to redirect the user after successfull login
  };

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  useEffect(() => {
    if (user) navigate(redirectTo);
  }, [user]);

  const controllers = { handleSubmit, handleChange, handleOAuth };

  if (data) return <div>Logged in</div>;
  if (error) return <div>{error}</div>;
  if (url) return <div>Checking credentials...</div>;

  return login ? <Login {...controllers} /> : <Register {...controllers} />;
};
export default Auth;
