import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [url, setUrl] = useState(null);
  const {
    data: logoutRes,
    loading,
    error,
  } = useFetch(url, { withCredentials: true });

  const logOut = () => {
    setUrl(`${import.meta.env.VITE_APP_API_URL}/login/remove`);
  };

  useEffect(() => {
    if (logoutRes) {
      localStorage.clear();
      setUser(null);
    }
  }, [logoutRes]);

  if (error) return <div>{error}</div>;

  return (
    <>
      <h2>{user.name}</h2>
      <div>{user.email}</div>
      <button onClick={logOut}>Logout</button>
    </>
  );
};

export default Profile;
