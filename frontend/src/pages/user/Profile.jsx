import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

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

  return (
    <>
      <h2>{user.name}</h2>
      <div>{user.email}</div>
      <button onClick={logOut}>Logout</button>
    </>
  );
};

export default Profile;
