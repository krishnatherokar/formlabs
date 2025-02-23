import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || null);
  useEffect(() => {
    if (!theme) {
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.setAttribute("theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.documentElement.style.setProperty(
        "--transition-property",
        "background"
      );
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  const changeTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };
  return (
    <div className={styles.navContainer}>
      <button onClick={changeTheme}>Theme</button>
      <Link to={"/"}>
        <button>Home</button>
      </Link>
      <Link to={"/form"}>
        <button>Form</button>
      </Link>
      <Link to={"/user"}>
        <button>Profile</button>
      </Link>
    </div>
  );
};
export default Navbar;
