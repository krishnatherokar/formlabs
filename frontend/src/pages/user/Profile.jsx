import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Profilebody from "../../components/user/Profilebody";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const logOut = async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/login/remove`,
      {
        withCredentials: true,
      }
    );
    if (response) {
      localStorage.clear();
      setUser(null);
    }
  };

  const props = {
    user,
    logOut,
  };

  return <Profilebody {...props} />;
};

export default Profile;
