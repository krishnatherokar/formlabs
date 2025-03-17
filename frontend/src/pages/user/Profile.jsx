import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Profilebody from "../../components/user/Profilebody";
import useFetch from "../../hooks/useFetch";
import FullScreen from "../../components/containers/FullScreen";
import LoadingCard from "../../components/loading/LoadingCard";
import Error from "../../components/error/Error";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [url, setUrl] = useState(null);
  const { data: response, loading, error } = useFetch(url, {}, "DELETE");
  const logOut = () => {
    setUrl(`${import.meta.env.VITE_APP_API_URL}/login/remove`);
  };

  useEffect(() => {
    if (response) {
      localStorage.clear();
      setUser(null);
    }
  }, [response]);

  const props = {
    user,
    logOut,
  };

  if (error)
    return (
      <FullScreen>
        <Error>{error}</Error>
      </FullScreen>
    );

  if (url && loading)
    return (
      <FullScreen>
        <LoadingCard>Logging out...</LoadingCard>
      </FullScreen>
    );

  return <Profilebody {...props} />;
};

export default Profile;
