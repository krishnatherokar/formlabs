import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      const fetchedUser = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/user`,
        {
          withCredentials: true,
        }
      );
      setUser(fetchedUser.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
