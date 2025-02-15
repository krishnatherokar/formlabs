import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../context/userContext";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";

const Auth = ({ login }) => {
  const [url, setUrl] = useState(null);
  const { setUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({});
  const { data, loading, error } = useFetch(
    url,
    {
      body: credentials,
      withCredentials: true,
    },
    "POST"
  );

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(
      `${import.meta.env.VITE_APP_API_URL}${
        login ? "/login" : "/login/newuser"
      }`
    );
  };

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const controllers = { handleSubmit, handleChange };

  if (data) return <div>Logged in</div>;
  if (error) return <div>{error}</div>;
  if (url) return <div>Checking credentials...</div>;

  return login ? <Login {...controllers} /> : <Register {...controllers} />;
};
export default Auth;
