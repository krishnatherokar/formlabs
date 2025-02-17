import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    // if the user is present in localstorage, use it for faster response until we get the user data from the backend
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const fetchUser = async () => {
    try {
      const fetchedUser = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/user`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
      setUser(fetchedUser.data);
    } catch (err) {}
  };

  // whenever the user changes, update the localstorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  //fetch the user only once at beginning
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
