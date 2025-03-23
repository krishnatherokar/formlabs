import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdPersonOutline,
} from "react-icons/md";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || null);
  useEffect(() => {
    if (!theme) {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
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
      <Link className={styles.brandName} to={"/"}>
        FormLabs
      </Link>
      <Link to={"/user"}>
        <MdPersonOutline />
      </Link>
      <span onClick={changeTheme}>
        {theme == "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
      </span>
    </div>
  );
};
export default Navbar;
