import { useLocation, useNavigate } from "react-router-dom";

const LoginButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate(`/auth?redirectTo=${location.pathname}`);
  };
  return (
    <button type="button" onClick={redirectToLogin}>
      Login
    </button>
  );
};
export default LoginButton;
