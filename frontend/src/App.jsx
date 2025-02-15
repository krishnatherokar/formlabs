import { Navigate, Route, Routes } from "react-router-dom";
import { HomeRoutes } from "./routes/HomeRoutes";
import { UserRoutes } from "./routes/UserRoutes";
import { FormRoutes } from "./routes/FormRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";
import NotFound from "./pages/notfound/NotFound";
import { useContext } from "react";
import { UserContext } from "./context/userContext";

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <Routes>
      {HomeRoutes}
      {UserRoutes(user)}
      {FormRoutes}
      {AuthRoutes(user)}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
