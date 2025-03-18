import { useSearchParams } from "react-router-dom";
import styles from "./googlebutton.module.css";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  // to get the queries in the url
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/user";

  const handleOAuth = () => {
    window.location.href = `${
      import.meta.env.VITE_APP_API_URL
    }/login/google?redirectTo=${redirectTo}`;
    // the url has redirectTo query to indicate where to redirect the user after successfull login
  };
  return (
    <button className={styles.googleButton} onClick={handleOAuth}>
      <FcGoogle className={styles.googleSvg} />
      Continue with Google
    </button>
  );
};
export default GoogleButton;
